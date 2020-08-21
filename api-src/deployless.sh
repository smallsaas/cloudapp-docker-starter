#!/usr/bin/bash

mod=$1

## host ##
target='root@server_ip:/root/dev/'
#### split from target  below ###
app_path=${target##*:}  ## cur before :
ssh_host=${target%%:*}
app='${app}-api'
####


## debug
echo ssh_host= $ssh_host
echo app_path= $app_path
#exit
## end debug

if [ ! $mod ];then
   echo 'Usage: deployless <module>'
   echo '  e.g. deployless env-fault'
   exit
fi

if [ ! -d  $mod ];then
   if [ ! -d ../$mod ];then 
     echo module $mod not exists
     exit
   else
     cd ..
   fi
fi

## deploy lib
deploy_lib() {
  list=()
  for jar in $(ls target/*.jar);do
     if [ $jar == target/*standalone.jar ];then
        echo $jar >/dev/null
     else
       list="$list $jar"
     fi
  done

  echo scp $list ${target}/${app}/lib
  scp $list ${target}/${app}/lib
  echo ssh $ssh_host \"cd $app_path/${app} exec sh docker-deploy-lib.sh\"
  ssh $ssh_host "cd $app_path/${app} && sh docker-deploy-lib.sh"
}


## main  ##
cd $mod  ## go into module

deploy_lib


# done
echo Done


