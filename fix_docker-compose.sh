#!/usr/bin/bash

webapps=$(pwd)

domain=$1
if [ ! $domain ];then
    echo Usage: fix_domain.sh
    exit
fi


if [ -f $webapps/docker-compose.yml ];then
	#sed "s/file-host:http://[\w\.]+\//file-host: http://$domain/attachment/" $webapps/config/application.yml
	#echo $teststring | sed "s/http:\/\/[a-zA-Z\.]*\/attachment/http:\/\/$domain\/attachment/" 
	sed "s/[[:space:]]*MYSQL_DATABASE:[[:space:]]*[a-zA-Z\.]*/      MYSQL_DATABASE: $domain/" $webapps/docker-compose.yml
else echo docker-compose.yml not found!
fi


