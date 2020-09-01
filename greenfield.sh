#!/usr/bin/bash

webapps=$(pwd)

app=$1
port=$2
database=$3

if [ ! $database ]; then
  echo 'Usage: greenfield.sh <app> <port> <database>'
  echo '   Option:'
  echo '      app       - app name a.w.a. prefix of docker container name'
  echo '      port      - expose port from host'
  echo '      database  - database name'
  exit
fi

if [ -f $webapps/docker-compose.yml ]; then
  sed -i "s/MYSQL_DATABASE:[[:space:]]*[a-zA-Z\.]*/MYSQL_DATABASE: $database/" $webapps/docker-compose.yml
  sed -i "s/container_name:[[:space:]]*\${[a-zA-Z\.]*}-/container_name: $app-/g" $webapps/docker-compose.yml
  sed -i "s/-[[:space:]]*[0-9]*:80/- $port:80/" $webapps/docker-compose.yml
  echo Initialize docker-compose.yml successfully.
else
  echo docker-compose.yml not found!
fi

if [ -f $webapps/api/config/application.yml ]; then
  sed -i "s/jdbc:mysql:\/\/mysqlserver:3306\/[a-zA-Z\.]*?/jdbc:mysql:\/\/${app}-mysql:3306\/$database?/" $webapps/api/config/application.yml
  echo Initialize application.yml successfully.
else
  echo application.yml not found!
fi

if [ -f $webapps/api/docker-deploy-lib.sh ]; then
  sed -i "s/docker_tool=[[:space:]]*\${[a-zA-Z\.]*}-/docker_tool=${app}-/" $webapps/api/docker-deploy-lib.sh
  echo Initialize docker-deploy-lib.sh successfully.
else
  echo $webapps/api/docker-deploy-lib.sh not found!
fi

exit
## 运行greenfield进行数据库初始化
#docker-compose -f docker-compose.yml up
