#!/usr/bin/bash
docker_tool=${app}-mysql
docker_mysql=mysql

if [ ! $docker_tool ]; then
  echo deploy docker name of image mysql not defined
  exit
fi

if [ ! $docker_mysql ]; then
  echo target docker name for app mysql not defined
  exit
fi

function getContainerIp() {
  return docker inspect --format '{{ .NetworkSettings.Networks.sandbox_default.IPAddress }}' $docker_tool
}

## deploy
docker exec $docker_tool bash deploy-db.sh $*
