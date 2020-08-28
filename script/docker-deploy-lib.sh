#!/bin/bash
docker_tool=${app}-api
docker_api=api
delete='^-d$'

if [ ! $docker_tool ];then
  echo deploy docker name of image allin-web:jdk11 not defined
  exit
fi

if [ ! $docker_api ];then
   echo target docker name for app api a.k.a. app-openjre11 not defined
   exit
fi

## deploy
docker exec $docker_tool bash ./deploy-lib.sh $*
if [ "`ls -A lib`" = "" ];then
    docker-compose -f ../docker-compose.yml restart $docker_api
else
    rm -rf lib/*
fi





