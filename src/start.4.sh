#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2023.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

image="dwidge/proxy"
name=$1
port=$2
./build.sh $image
docker network create backend || true
docker run -it --rm --init --env-file ../.env.local --name $name -p $port:8080 --network backend --device=/dev/net/tun --cap-add=NET_ADMIN -v /etc/localtime:/etc/localtime:ro $image
