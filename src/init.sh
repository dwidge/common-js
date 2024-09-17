#!/bin/bash

# Copyright DWJ 2023  
# Distributed under the Boost Software License, Version 1.0.  
# https://www.boost.org/LICENSE_1_0.txt

# disables ubuntu auto updates which crash server

([ "$MODE" == "check" ]) && echo -e "${GREEN}start skipped ("$MODE")${NC}" && exit 0

echo -e "${BROWN}Sending commands to $USERHOST...${NC}"
ssh $USERHOST << EOF
  sudo apt-get autoremove -y --purge unattended-upgrades snapd gnome-software-plugin-snap
  sudo apt-mark hold unattended-upgrades snapd
  sudo rm -rf /var/cache/snapd/
  rm -rf ~/snap
EOF
echo -e "${GREEN}All commands sent.${NC}"
