#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2023.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

image=$1
docker build --progress=plain -t $image ..
docker history --format "{{.CreatedBy}}\n  {{.Size}}" $image
docker images $image
