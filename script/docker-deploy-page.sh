#!/bin/bash
docker_tool=${app}-web
crudless='^-c$'
sql='crudless.sql'
crud_json='sql.crud.json'

if [ ! $docker_tool ]; then
  echo deploy docker name of image node:sandbox not defined
  exit
fi

## deploy
docker exec $docker_tool bash deploy-page.sh $*

if [[ "$1" =~ $crudless ]] && [ -f "./tmp/$sql" ] && [ -f "./tmp/$crud_json" ]; then
  apiName=$3
  cp -r ./tmp/$sql ../api/lib/
  cp -r ./tmp/$crud_json ../api/lib/
  docker exec ${docker_tool%%-*}-api bash deploy-lib.sh $1 $apiName /webapps/lib/$sql /webapps/lib/$crud_json
  exit
fi