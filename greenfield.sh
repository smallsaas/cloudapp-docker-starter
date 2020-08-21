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
else
  echo docker-compose.yml not found!
fi

if [ -f $webapps/api/config/application.yml ]; then
	sed -i "s/jdbc:mysql:\/\/mysqlserver:3306\/[a-zA-Z\.]*?/jdbc:mysql:\/\/${app}-mysql:3306\/$database?/" $webapps/api/config/application.yml
	echo Initialize application.yml successfully.
else
  echo application.yml not found!
fi

if [ -f $webapps/web/src/pages/deploy-page.sh ]; then
	sed -i "s/docker_web=[[:space:]]*\${[a-zA-Z\.]*}-/docker_web=${app}-/" $webapps/web/src/pages/deploy-page.sh
	echo Initialize deploy-page.sh successfully.
else
	echo $webapps/web/src/pages/deploy-page.sh not found!
fi

if [ -f $webapps/api/docker-deploy-lib.sh ]; then
	sed -i "s/docker_tool=[[:space:]]*\${[a-zA-Z\.]*}-/docker_tool=${app}-/" $webapps/api/docker-deploy-lib.sh
	sed -i "s/docker_api=[[:space:]]*\${[a-zA-Z\.]*}-/docker_api=${app}-/" $webapps/api/docker-deploy-lib.sh
	echo Initialize docker-deploy-lib.sh successfully.
else
	echo $webapps/api/docker-deploy-lib.sh not found!
fi

if [ -f $webapps/api/deploy-lib.sh ]; then
	sed -i "s/DL_DOCKERNAME='[[:space:]]*\${[a-zA-Z\.]*}-/DL_DOCKERNAME='${app}-/" $webapps/api/deploy-lib.sh
	echo Initialize docker-lib.sh successfully.
else
	echo $webapps/api/deploy-lib.sh not found!
fi

if [ -f $webapps/api-src/deployless_pages.sh ]; then
	sed -i "s/app='\${[a-zA-Z\.]*}-/app='${app}-/" $webapps/api-src/deployless_pages.sh
	echo Initialize deployless_pages.sh successfully.
else
	echo $webapps/api-src/deployless_pages.sh not found!
fi

if [ -f $webapps/api-src/deployless.sh ]; then
	sed -i "s/app='\${[a-zA-Z\.]*}-/app='${app}-/" $webapps/api-src/deployless.sh
	echo Initialize deployless.sh successfully.
else
	echo $webapps/api-src/deployless.sh not found!
fi

cd ./api-src && mvn package && cp ./target/env-test-saas-1.0.0-standalone.jar ../api/
exit
## 运行greenfield进行数据库初始化
#docker-compose -f docker-compose.yml up