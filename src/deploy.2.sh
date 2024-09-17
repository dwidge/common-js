#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2023.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

name="dwidge/example-client"
server=$1

ssh $server -C 'ls'
./build.sh $name
docker save $name | gzip | ssh -C $server 'docker load && server/compose/start.sh'
