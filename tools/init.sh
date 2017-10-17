#!/bin/sh

# exits on error
set -e

cd "$(command dirname -- "${0}")"
cd ..

echo Running npm install
npm install

if ! [ -e "wappuapp-backend/" ]; then
  echo "Clone the backend repository into this folder"
else 

  cd wappuapp-backend

  if ! [ -e ".env" ]; then
    ( cp .env-sample .env &&
    echo "Created .env file. Fill in the env-variables." )
  else 
    echo ".env file exists, did not rewrite"
  fi;
  
fi;
