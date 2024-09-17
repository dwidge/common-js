#!/bin/bash

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

echo BACKUP_REMOTE_DIR=$BACKUP_REMOTE_DIR
echo BACKUP_LOCAL_DIR=$BACKUP_LOCAL_DIR
echo COMPOSE_DB_CONTAINER_NAME=$COMPOSE_DB_CONTAINER_NAME

([ "$MODE" == "check" ]) && echo -e "${GREEN}start skipped ("$MODE")${NC}" && exit 0

rsync --filter=":e- .dockerignore" -v -a "$BACKUP_LOCAL_DIR/" "$USERHOST:~/$BACKUP_REMOTE_DIR/" || (echo -e "${RED}$USERHOST rsync failed${NC}" && exit 1)
echo -e "${GREEN}All files sent.${NC}"

echo -e "${BROWN}Sending commands to $USERHOST...${NC}"
ssh $USERHOST << EOF
  export NAME="$NAME"
  export DOMAINS="$DOMAINS"
  export PUBLIC_HOST="$PUBLIC_HOST"
  export REACT_APP_MAIN="$REACT_APP_MAIN"
  export COMPOSE_PROJECT_NAME="$COMPOSE_PROJECT_NAME"
  echo NAME="\$NAME"
  echo DOMAINS="\$DOMAINS"
  echo PUBLIC_HOST="\$PUBLIC_HOST"
  echo REACT_APP_MAIN="\$REACT_APP_MAIN"
  echo COMPOSE_PROJECT_NAME="\$COMPOSE_PROJECT_NAME"

  cd server/compose
  CONTAINER_ID=\$(docker compose ps -q "${COMPOSE_DB_CONTAINER_NAME}")
  BACKUP_FILE="~/${BACKUP_REMOTE_DIR}/db/${COMPOSE_DB_CONTAINER_NAME}.sql.gz"
  echo CONTAINER_ID="\$CONTAINER_ID"
  echo BACKUP_FILE="\$BACKUP_FILE"
  zcat "\${BACKUP_FILE}" | docker exec -i "\${CONTAINER_ID}" mysql -u $DB_USERNAME -p"$DB_PASSWORD"
EOF
echo -e "${GREEN}All commands sent.${NC}"
