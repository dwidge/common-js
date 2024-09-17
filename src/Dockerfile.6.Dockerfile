# Copyright DWJ 2024.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

ARG PUBLIC_URL /.
RUN echo "E404:.$PUBLIC_URL/index.html" >> httpd.conf

FROM lipanski/docker-static-website:2.4.0
ARG PUBLIC_URL /.
COPY --from=build /app/httpd.conf .
COPY --from=build /app/build/ .$PUBLIC_URL
CMD ["/busybox-httpd", "-f", "-v", "-p", "80", "-c", "httpd.conf"]
EXPOSE 80
