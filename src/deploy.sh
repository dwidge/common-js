#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2024.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

image=$1
server=$2

ssh $server 'ls'
./build.sh $image
docker save $image | gzip | ssh $server 'docker load && server/compose/start.sh'
