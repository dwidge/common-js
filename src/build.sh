#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2024.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

image=$1
echo PUBLIC_URL=$PUBLIC_URL
docker build --build-arg PUBLIC_URL --progress=plain -t $image ..
docker history --format "{{.CreatedBy}}\n  {{.Size}}" $image
docker images $image
