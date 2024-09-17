#!/bin/bash

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

echo -e "${BROWN}Sending files to $USERHOST...${NC}"
if ! rsync --delete-after --filter=":e- .dockerignore" -v -a .. "$USERHOST:~/server/"; then
  echo -e "${RED}$USERHOST rsync failed${NC}"
  exit 1
fi
echo -e "${GREEN}All files sent.${NC}"
