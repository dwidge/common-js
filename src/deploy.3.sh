#!/bin/bash

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

# env files
cat ../.env > .env
cat ../.env.local >> .env
cat ../.env.production >> .env
cat ../.env.production.local >> .env

set -a
. .env
set +a

# script args
export USERHOST="$1"
export DOMAINS="$2"
export MODE="$3"
read -r -a domains <<< "$DOMAINS"
export USER=${USERHOST%%@*}
export HOST=${USERHOST##*@}
export SUB=${HOST%%.*}
export NAME="prod"
export PUBLIC_HOST="https://${domains[0]}"
export REACT_APP_MAIN="$PUBLIC_HOST"
export REACT_APP_API="$PUBLIC_HOST/api"

export RED='\033[0;31m'
export GREEN='\033[0;32m'
export BROWN='\033[0;33m'
export NC='\033[0m' # No Color

!( source ./scripts/check.sh ) && echo -e "${RED}check failed${NC}" && exit 1

if [ "$MODE" == "check" ]; then
echo -e "${GREEN}skipping${NC}"
elif [ "$MODE" == "init" ]; then
!( source ./scripts/init.sh ) && echo -e "${RED}init failed${NC}" && exit 1
elif [ "$MODE" == "backup" ]; then
!( source ./scripts/backup.sh ) && echo -e "${RED}backup failed${NC}" && exit 1
elif [ "$MODE" == "restore" ]; then
!( source ./scripts/restore.sh ) && echo -e "${RED}restore failed${NC}" && exit 1
elif [ "$MODE" == "quick" ]; then
!( source ./scripts/sync.sh ) && echo -e "${RED}sync failed${NC}" && exit 1
!( source ./scripts/start.sh ) && echo -e "${RED}start failed${NC}" && exit 1
elif [ "$MODE" == "build" ]; then
!( source ./scripts/build.sh ) && echo -e "${RED}build failed${NC}" && exit 1
else
!( source ./scripts/build.sh ) && echo -e "${RED}build failed${NC}" && exit 1
!( source ./scripts/sync.sh ) && echo -e "${RED}sync failed${NC}" && exit 1
!( source ./scripts/start.sh ) && echo -e "${RED}start failed${NC}" && exit 1
fi

echo -e "${GREEN}all done $MODE${NC}"
