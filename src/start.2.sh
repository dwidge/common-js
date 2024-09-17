#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
set -e

# Copyright DWJ 2023.
# Distributed under the Boost Software License, Version 1.0.
# https://www.boost.org/LICENSE_1_0.txt

name="dwidge/example-client"
port=$1
./build.sh $name
docker run -it --rm --init -p $port:80 $name
