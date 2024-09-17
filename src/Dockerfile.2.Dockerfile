# Copyright DWJ 2024.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

FROM alpine as build
WORKDIR /tmp/app/
RUN mkdir -p build
COPY . build

ARG PUBLIC_URL /.
RUN echo "E404:.$PUBLIC_URL/index.html" >> httpd.conf

FROM lipanski/docker-static-website:latest
ARG PUBLIC_URL /.
COPY --from=build /tmp/app/httpd.conf .
COPY --from=build /tmp/app/build/ .$PUBLIC_URL
CMD ["/busybox-httpd", "-f", "-v", "-p", "80", "-c", "httpd.conf"]
EXPOSE 80
