#!/bin/bash

# apps=("api" "admin" "moderator" "example" "example-dev")
apps=("api" "admin" "moderator" "example")

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

echo -e "${BROWN}Building apps...${NC}"
  if ! (MSYS_NO_PATHCONV=1 npm run build); then
    echo -e "${RED}$app build failed${NC}"
    exit 1
  fi
echo -e "${GREEN}All apps built.${NC}"
