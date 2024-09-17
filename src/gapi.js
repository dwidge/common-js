// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const log =
  (s) =>
  (...a) => {
    console.log(s, ...a);
    return a[0];
  };

export const glog = (s) => (e) => {
  console.log(s, e.result);
  return e;
};

const loadScript = (url) =>
  new Promise((onload, onerror) => {
    const scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = url;
    scr.defer = true;
    scr.onload = onload;
    scr.onerror = onerror;
    document.getElementsByTagName("head")[0].appendChild(scr);
  });

const loadToken = (clientId, scopes) => {
  const oauth2 = window.google.accounts.oauth2;
  let callback, onerror, response;

  const client = oauth2.initTokenClient({
    client_id: clientId,
    prompt: "",
    scope: scopes.join(" "),
    callback: (r) => {
      response = r;
      if (response?.access_token) callback(response);
      else onerror(response);
    },
    onerror: (error) => {
      onerror(error);
    },
  });

  return ({ timeout = 0 }) =>
    new Promise((res, rej) => {
      if (oauth2.hasGrantedAllScopes(response, ...scopes)) {
        res(response);
      } else {
        callback = res;
        onerror = rej;
        client.requestAccessToken({ prompt: "" });
        if (timeout)
          sleep(timeout).then(() =>
            rej(new Error("requestAccessToken: Timeout"))
          );
      }
    });
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function loadApi(apiKey, discoveryDocs) {
  const { gapi } = window;
  await new Promise((callback, onerror) =>
    window.gapi.load("client", { callback, onerror })
  ).then(log("gapi.load"));
  await gapi.client
    .init({
      apiKey,
      discoveryDocs,
    })
    .then(log("gapi.client.init"));
}

export async function loadForms(apiKey, clientId) {
  await loadScript("https://accounts.google.com/gsi/client");
  await loadScript("https://apis.google.com/js/api.js");
  await loadApi(apiKey, [
    "https://forms.googleapis.com/$discovery/rest?version=v1",
  ]);
  const refresh = await loadToken(clientId, [
    "https://www.googleapis.com/auth/forms.body",
  ]);
  const forms = new Forms(window.gapi.client.forms.forms);

  return async (timeout) => {
    await refresh({
      timeout,
    });
    return forms;
  };
}

class Forms {
  constructor(forms) {
    this.forms = forms;
  }
  async create({ documentTitle, title }) {
    const {
      result: { formId, responderUri, revisionId },
    } = await this.forms
      .create({
        info: { document_title: documentTitle, title },
      })
      .then(glog("create then"))
      .catch(glog("create catch"));
    return { formId, responderUri, revisionId };
  }

  /** @see https://developers.google.com/forms/api/reference/rest/v1/forms/batchUpdate */
  async updateTitle(formId, { title }) {
    await this.forms
      .batchUpdate({
        formId,
        includeFormInResponse: false,
        requests: [
          {
            updateFormInfo: {
              info: { title },
              updateMask: "title",
            },
          },
        ],
      })
      .then(glog("updateTitle then"))
      .catch(glog("updateTitle catch"));
    return {};
  }

  /** @see https://developers.google.com/forms/api/reference/rest/v1/forms/batchUpdate */
  async enableQuery(formId, { isQuery = true }) {
    await this.forms
      .batchUpdate({
        formId,
        includeFormInResponse: false,
        requests: [
          {
            updateSettings: {
              settings: {
                querySettings: {
                  isQuery: isQuery,
                },
              },
              updateMask: "querySettings.isQuery",
            },
          },
        ],
      })
      .then(glog("enableQuery then"))
      .catch(glog("enableQuery catch"));
    return {};
  }

  /** @see https://developers.google.com/forms/api/reference/rest/v1/forms#itemitem */
  async addShortTextItem(
    formId,
    {
      title = "",
      description = "",
      required = true,
      index = 0,
      grading: { pointValue = 1, results = [""] },
    }
  ) {
    const {
      result: {
        form: {
          items: [
            {
              itemItem: {
                item: { itemId },
              },
            },
          ],
        },
      },
    } = await this.forms
      .batchUpdate({
        formId,
        includeFormInResponse: true,
        requests: [
          {
            createItem: {
              item: {
                //itemId: string,
                title,
                description,
                itemItem: {
                  item: {
                    //itemId: string,
                    required: required,
                    grading:
                      pointValue != null
                        ? {
                            pointValue: pointValue,
                            correctResults: {
                              results: results.map((a) => ({ value: a })),
                            },
                          }
                        : undefined,
                    textItem: {
                      paragraph: false,
                    },
                  },
                },
              },
              location: {
                index,
              },
            },
          },
        ],
      })
      .then(glog("addShortTextItem then"))
      .catch(glog("addShortTextItem catch"));
    return { itemId };
  }

  async get(formId) {
    const {
      result: {
        info: { documentTitle, title },
        responderUri,
        revisionId,
      },
    } = await this.forms
      .get({
        formId,
      })
      .then(glog("get then"))
      .catch(glog("get catch"));
    return { documentTitle, title, responderUri, revisionId };
  }

  async createFull({ documentTitle, title, itemResultPairs }) {
    const { formId, responderUri, revisionId } = await this.create({
      documentTitle,
      title,
    });
    await this.enableQuery(formId, { isQuery: true });
    for (let i in itemResultPairs) {
      const { item, result } = itemResultPairs[i];
      await this.addShortTextItem(formId, {
        index: +i - 1,
        title: "Item " + i,
        description: item,
        grading: {
          results: [result],
        },
      });
    }
    return { formId, responderUri, revisionId };
  }
}
