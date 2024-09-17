// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Configuration, OpenAIApi } from "openai";
import { openai as openaiConfig } from "example-api/config/index";
import { GenericError } from "./Error.js";
import { Ai } from "../models/index.js";

const configuration = new Configuration({
  apiKey: openaiConfig.key,
});
const openai = new OpenAIApi(configuration);

async function getCompletion(
  prompt,
  { user = undefined, max_tokens = 200, model = "gpt-3.5-turbo" }
) {
  if (!configuration.apiKey)
    throw new GenericError("OpenAI API key not configured");

  const completion = await openai
    .createChatCompletion({
      model,
      max_tokens,
      user,
      messages: [{ role: "user", content: prompt }],
    })
    .catch((e) => {
      console.log("getCompletionE1", e);
      throw new GenericError(e.message);
    });
  const { usage, choices } = completion.data;
  const [
    {
      message: { content },
    },
  ] = choices;
  return content;
}

async function generate(UserId, prompt, max_tokens = 200, model) {
  const completion = await getCompletion(prompt, {
    user: UserId,
    max_tokens,
    model,
  });
  await Ai.create({ UserId, prompt, completion });
  return completion;
}

function animalName(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `
Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names: `;
}

const extractWords = (s, minWords = 8, maxWords = 32) => {
  const words = s.split(" ");
  const beg = (Math.random() * (words.length - minWords)) | 0;
  const end =
    beg + Math.min((Math.random() * (words.length - beg)) | 0, maxWords);
  return words.slice(beg, end).join(" ");
};

const extractTag = (s, begTag, endTag) => {
  const beg = s.indexOf(begTag);
  if (beg < 0) return "";
  const end = s.lastIndexOf(endTag);
  if (end < 0) return "";
  const body = s.slice(beg + begTag.length, end);
  console.log("extractTagL1", body);
  return body;
};

const extractHtmlBody = (s) => {
  const body = extractTag(s, "<body>", "</body>");
  if (!body) throw new GenericError("Invalid result, try again");
  return body;
};

const extractJson = (s) => {
  try {
    return JSON.parse("{" + extractTag(s, "{", "}") + "}");
  } catch (e) {
    throw new GenericError("Invalid result, try again");
  }
};
const extractJsonArray = (s) => {
  try {
    return JSON.parse("[" + extractTag(s, "[", "]") + "]");
  } catch (e) {
    throw new GenericError("Invalid result, try again");
  }
};

const omitSorry = (s) =>
  s
    .split("\n")
    .filter(
      (s) =>
        !(
          s.startsWith("Sorry,") ||
          s.startsWith("Sure") ||
          s.includes("as an AI model")
        )
    )
    .join("\n");

export {
  generate,
  extractWords,
  extractHtmlBody,
  extractJson,
  extractJsonArray,
  omitSorry,
  animalName,
};
