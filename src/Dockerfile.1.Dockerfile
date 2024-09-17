# Copyright DWJ 2024.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

FROM node:18-alpine as build
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake
RUN npm install -g pnpm
USER node
WORKDIR /tmp/app
RUN mkdir -p .
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}
COPY --chown=node pnpm-lock.yaml .
COPY --chown=node .npmrc .
RUN pnpm fetch
COPY --chown=node . .
RUN pnpm install
RUN pnpm run build

ARG PUBLIC_URL /.
RUN echo "E404:.$PUBLIC_URL/index.html" >> httpd.conf

FROM lipanski/docker-static-website:2.2.1
ARG PUBLIC_URL /.
COPY --from=build /tmp/app/httpd.conf .
COPY --from=build /tmp/app/dist/ .$PUBLIC_URL
CMD ["/busybox", "httpd", "-f", "-v", "-p", "80", "-c", "httpd.conf"]
EXPOSE 80
