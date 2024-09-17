#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2024.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

image=$1
name=$2
port=$3

pdir="$(dirname "$(pwd)")"
echo $pdir
mkdir -p $pdir/data
touch ../.env.local

./build.sh $image
docker network create backend || true
docker run -it --rm --init --env-file ../.env.local -p $port --name $name --network backend -v "$pdir/data:/tmp/app/data" $image
