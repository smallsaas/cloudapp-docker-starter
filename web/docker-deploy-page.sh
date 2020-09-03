#!/bin/bash
docker_tool=${app}-web

if [ ! $docker_tool ]; then
  echo deploy docker name of image node:sandbox not defined
  exit
fi

## deploy
docker exec $docker_tool bash deploy-page.sh $*