#!/bin/sh
docker_tool=${app}-api
docker_api=api


if [ ! $docker_tool ];then
  echo deploy docker name of image allin-web:jdk11 not defined
  exit
fi

if [ ! $docker_api ];then
   echo target docker name for app api a.k.a. app-openjre11 not defined
   exit
fi

## deploy
docker exec $docker_tool sh ./deploy-lib.sh $1

echo ""
docker-compose -f ../docker-compose.yml restart $docker_api

