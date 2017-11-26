#!/bin/sh

set -e

cd $(dirname $0)
cd ../wappuapp-adminpanel

docker build . --file Dockerfile.web -t wappuapp_adminpanel:latest
docker tag wappuapp_adminpanel:latest registry.heroku.com/wappuapp-adminpanel-dev/web
docker push registry.heroku.com/wappuapp-adminpanel-dev/web

heroku open -a wappuapp-adminpanel-dev
