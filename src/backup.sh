#!/bin/bash

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

echo BACKUP_REMOTE_DIR=$BACKUP_REMOTE_DIR
echo BACKUP_LOCAL_DIR=$BACKUP_LOCAL_DIR
echo COMPOSE_DB_CONTAINER_NAME=$COMPOSE_DB_CONTAINER_NAME

([ "$MODE" == "check" ]) && echo -e "${GREEN}start skipped ("$MODE")${NC}" && exit 0

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
  mkdir -p ~/$BACKUP_REMOTE_DIR/
  # docker compose cp api:./files ~/$BACKUP_REMOTE_DIR/files
  mkdir -p ~/$BACKUP_REMOTE_DIR/db
  CONTAINER_ID=\$(docker compose ps -q ${COMPOSE_DB_CONTAINER_NAME})
  BACKUP_FILE=~/$BACKUP_REMOTE_DIR/db/${COMPOSE_DB_CONTAINER_NAME}.sql.gz
  echo CONTAINER_ID="\$CONTAINER_ID"
  echo BACKUP_FILE="\$BACKUP_FILE"
  docker exec \${CONTAINER_ID} mysqldump -u $DB_USERNAME -p"$DB_PASSWORD" --all-databases | gzip > \${BACKUP_FILE}
  echo ls -l ~/$BACKUP_REMOTE_DIR/db
  ls -l ~/$BACKUP_REMOTE_DIR/db
EOF
echo -e "${GREEN}All commands sent.${NC}"

rsync --delete -v -a $USERHOST:~/$BACKUP_REMOTE_DIR/ "$BACKUP_LOCAL_DIR/" || (echo -e "${RED}$USERHOST rsync failed${NC}" && exit 1)
echo -e "${GREEN}All files received.${NC}"
