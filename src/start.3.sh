#!/bin/bash

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

echo -e "${BROWN}Sending commands to $USERHOST...${NC}"
ssh $USERHOST << EOF
  export NAME="$NAME"
  export DOMAINS="$DOMAINS"
  export PUBLIC_HOST="$PUBLIC_HOST"
  export REACT_APP_MAIN="$REACT_APP_MAIN"
  echo NAME="\$NAME"
  echo DOMAINS="\$DOMAINS"
  echo PUBLIC_HOST="\$PUBLIC_HOST"
  echo REACT_APP_MAIN="\$REACT_APP_MAIN"
  cd server/compose
  (docker compose --env-file .env down; docker compose --env-file .env up --build --remove-orphans) > ./compose.log 2>&1 &
EOF
echo -e "${GREEN}All commands sent.${NC}"
