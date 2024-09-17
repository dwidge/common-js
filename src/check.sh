#!/bin/bash

dirs=( "../compose" "../api" "../admin" "../moderator" "../example" )
files=( "../.env" "../compose/docker-compose.yaml" "../api/package.json" "../admin/package.json" "../moderator/package.json" "../example/package.json" )

argenvs=( 1 2 USERHOST DOMAINS USER HOST SUB NAME PUBLIC_HOST REACT_APP_MAIN)
dotenvs=( REACT_APP_API REACT_APP_CONSOLE REACT_APP_MODERATORS REACT_APP_ADMIN COMPOSE_PROJECT_NAME DOMAINS CERTBOT_EMAILS CERTBOT_TEST_CERT CERTBOT_RSA_KEY_SIZE DB_HOST DB_PORT DB_DIALECT DB_NAME DB_USERNAME TESTER_EMAIL )
secrets=( ACCESS_TOKEN REFRESH_TOKEN DB_PASSWORD TESTER_PASSWORD OPENAI_API_KEY )
envs=( ${argenvs[@]} ${dotenvs[@]} )


# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

read -r -a domains <<< "$DOMAINS"
echo -e "${BROWN}Checking vhosts...${NC}"
for s in "${domains[@]}"; do
  [ ! -f "nginx-ssl/vhosts/$s.conf" ] && echo -e "${RED}nginx-ssl/vhosts/$s.conf does not exist.${NC}" && exit 1
  echo "$s found"
done
echo -e "${GREEN}All vhosts found.${NC}"

echo -e "${BROWN}Checking envs...${NC}"
for env in "${envs[@]}"; do
[ -z "${!env}" ] && echo -e "${RED}$env = ${NC}" && exit 1
[[ $env = _* ]] && echo -e "$env = ***" || echo -e "$env = ${!env}"
done
echo -e "${GREEN}All envs checked.${NC}"


echo -e "${BROWN}Checking secrets...${NC}"
for env in "${secrets[@]}"; do
[ -z "${!env}" ] && echo -e "${RED}$env = ${NC}" && exit 1
echo -e "$env = ***"
done
echo -e "${GREEN}All secrets checked.${NC}"


echo -e "${BROWN}Checking dirs...${NC}"
for s in "${dirs[@]}"; do
  [ ! -d "$s" ] && echo -e "${RED}$s does not exist.${NC}" && exit 1
  echo "$s found"
done
echo -e "${GREEN}All dirs found.${NC}"


echo -e "${BROWN}Checking files...${NC}"
for s in "${files[@]}"; do
  [ ! -f "$s" ] && echo -e "${RED}$s does not exist.${NC}" && exit 1
  echo "$s found"
done
echo -e "${GREEN}All files found.${NC}"


echo -e "${BROWN}Checking ssh...${NC}"
status=$(ssh -o BatchMode=yes -o ConnectTimeout=2 $USER@$HOST echo ok 2>&1)
if [[ ! $status == ok ]] ; then
  echo -e "${RED}$USER@$HOST failed${NC}"
  echo -e "Try ssh $USER@$HOST manually to accept fingerprint?"
  exit 1
fi
echo "$USER@$HOST accepted"
echo -e "${GREEN}Working ssh found.${NC}"
