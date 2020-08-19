#!/usr/bin/env bash
## Java JDK 8 +U131 Solution
#  -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap
# JAVA_OPTIONS="Xms300m"

webapps=/webapps

## copy config logback-spring.xml
if [ ! -d "$webapps/config" ];then
   mkdir -p "$webapps/config"
fi

if [ ! -f "$webapps/config/logback-spring.xml" ];then
   cp /tmp/logback-spring.xml $webapps/config
fi
if [ ! -f "$webapps/config/produce.yml" ];then
   cp /tmp/produce.yml $webapps/config
fi
if [ ! -f "$webapps/config/application.yml" ];then
   cp $webapps/config/produce.yml $webapps/config/application.yml
fi

if [ ! -f "$webapps/config/greenfield.yml" ];then
   cp /tmp/greenfield.yml $webapps/config
fi


## fix url with ${URL}
bash /usr/local/bin/fix_url.sh 


## deploy
#if [ ! -f "$webapps/deploy-lib.sh" ];then
#   cp /usr/local/bin/deploy-lib.sh $webapps
#fi
#if [ ! -f "$webapps/predeploy.sh" ];then
#   cp /usr/local/bin/predeploy.sh $webapps
#fi
if [ ! -f "$webapps/docker-deploy-lib.sh" ];then
   cp /tmp/docker-deploy-lib.sh $webapps
fi


##
## do not need service.sh again
##
## copy service.sh to webapps
##if [ ! -e "$webapps/service.sh" ];then
##   cp /usr/local/bin/service.sh $webapps/service.sh
##fi


## always running as produce
running=produce

## run app
runapp=''

cd $webapps
if [ ! $runapp ];then
   ## only one app, assign 8080 port for it.
   for app in $(ls app.jar *-standalone.jar -t)
   do
      runapp=$app
   done

   ## check lib
   #bash /usr/local/bin/standalone_lib.sh $runapp $newlib
   #rm $newlib  ## just rm it for later update

   ## check exists
   if [ -e $runapp ];then
      #if [ $running = "produce" ];then
      if [ ${GREENFIELD} ];then
          #echo "java -jar $runapp --spring.profiles.greenfield= --server.port=8080 &"
          java -jar $runapp --spring.profiles.active=application-greenfield --server.port=8080
      else
          #echo "java -jar $runapp --spring.profiles.active=greenfield --server.port=8080 &"
          java -jar $runapp --spring.profiles.active=application-greenfield --server.port=8080
      fi
   fi
fi

if [ $running = "produce" ];then
   ## start other endpoint
   for ep in $(find . -name "*.jar")
   do
      wd=$(dirname $ep)
      if [ $wd = "." -o $wd = "./" ];then
          continue;
      fi

      cd $wd
      ep=$(basename $ep)

      ## start each endpoint
      if [ ${GREENFIELD} ];then
         echo "java -jar $ep --spring.profiles.active=greenfield"
         java -jar $ep --spring.profiles.active=greenfield
      else
         #echo "nohup java  $JAVA_OPTIONS  -jar $ep --spring.profiles.active=produce > /dev/null 2>&1 &"
         #nohup java $JAVA_OPTIONS -jar $ep --spring.profiles.active=produce > /dev/null 2>&1 & 
         echo "java $JAVA_OPTIONS -jar $ep --spring.profiles.active=greenfield --server.port=8080"
         java $JAVA_OPTIONS -jar $ep --spring.profiles.active=greenfield --server.port=8080
      fi

      ## go back
      cd $webapps
   done
fi



## web config
ln -s /var/www/html /dist

## fix endpoint
bash /usr/local/bin/fix_endpoint.sh


## 
/usr/sbin/nginx "-g" "daemon off;"

