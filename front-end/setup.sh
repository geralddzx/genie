#!/bin/bash
echo "$(uname)"
if [ "$(uname)" == "Darwin" ]; then
  echo "Creating postgresql user genie with password genie123 on MAC"
  psql -U postgres < create_user.sql;
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  echo "checking updates"
  sudo apt update
  sudo apt install python3-pip
  echo "Creating postgresql user genie with password genie123 on Linux"
  sudo su postgres < create_user_linux.sh
else
  echo "Operating system not supported"
  exit
fi

echo "creating database tables"
psql postgresql://genie:genie123@localhost:5432 < database.sql

echo "installing python3 dependencies"
pip3 install -r requirements.txt

echo "starting server"
python3 app.py
