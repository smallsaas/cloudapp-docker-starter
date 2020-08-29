#!/usr/bin/bash

mod=$1
option=$1
## host ##
target='root@server_ip:/root/dev/api/'
force='^-f$'
delete='^-d$'
#### split from target  below ###
app_path=${target##*:}  ## cur before :
ssh_host=${target%%:*}
####


## debug
#echo ssh_host= $ssh_host
#echo app_path= $app_path
#exit
## end debug

if [ ! $mod ];then
   echo 'Usage: deployless <module>'
   echo '  e.g. deployless env-fault'
   echo '  -d  --delete 删除资源包'
   echo '  -f  --force  强制装配资源包'
   exit
fi

if [[ "$option" =~ $force ]] || [[ "$option" =~ $delete ]];then
	mod=$2
	if [[ "$option" =~ $delete ]];then
		echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option $mod\"
		ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option $mod"
		exit
	fi
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

  echo scp $list ${target}/lib
  scp $list ${target}/lib
  echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
  ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
}

## main  ##
cd $mod  ## go into module

deploy_lib


# done
echo Done


