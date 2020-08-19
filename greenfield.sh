#!/usr/bin/bash

webapps=$(pwd)

app=$1
port=$2
database=$3

if [ ! $database ];then
    echo 'Usage: cloudapp-config.sh <app> <port> <database>'
    echo '   Option:'
    echo '      app       - Application name'
    echo '      port      - Nginx port'
    echo '      database  - Application database name'
    exit
fi


if [ -f $webapps/docker-compose.yml ];then
	sed -i "s/MYSQL_DATABASE:[[:space:]]*[a-zA-Z\.]*/MYSQL_DATABASE: $database/" $webapps/docker-compose.yml
  sed -i "s/container_name:[[:space:]]*\${[a-zA-Z\.]*}-/container_name: $app-/g" $webapps/docker-compose.yml
  sed -i "s/-[[:space:]]*[0-9]*:80/- $port:80/" $webapps/docker-compose.yml
else
  echo docker-compose.yml not found!
fi

if [ -f $webapps/greenfield.yml ];then
	sed -i "s/MYSQL_DATABASE:[[:space:]]*[a-zA-Z\.]*/MYSQL_DATABASE: $database/" $webapps/greenfield.yml
  sed -i "s/container_name:[[:space:]]*\${[a-zA-Z\.]*}-/container_name: $app-/g" $webapps/greenfield.yml
else
  echo greenfield.yml not found!
fi

if [ -f $webapps/api/config/application.yml ];then
  sed -i "s/jdbc:mysql:\/\/mysqlserver:3306\/[a-zA-Z\.]*?/jdbc:mysql:\/\/mysqlserver:3306\/$database?/" $webapps/api/config/application.yml
else
  echo application.yml not found!
fi

if [ -f $webapps/api/config/application-greenfield.yml ];then
  sed -i "s/jdbc:mysql:\/\/mysqlserver:3306\/[a-zA-Z\.]*?/jdbc:mysql:\/\/mysqlserver:3306\/$database?/" $webapps/api/config/application-greenfield.yml
else
  echo application-greenfield.yml not found!
fi


## 运行greenfield进行数据库初始化
docker-compose -f greenfield.yml up

