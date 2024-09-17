#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2023.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

image="dwidge/example-api"
name=$1
port=$2

pdir="$(dirname "$(pwd)")"
echo $pdir
mkdir -p $pdir/data/screenshots

./build.sh $image
docker network create backend || true
docker run -it --rm --init --env-file ../.env.local -p $port:3002 --name $name --network backend -v "$pdir/data/screenshots:/app/data/screenshots" $image
