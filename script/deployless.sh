#!/usr/bin/bash
jar=$1
option=$1
## host ##
target='root@server_ip:/root/dev/api/'
force='^-f$'
delete='^-d$'
list='^-l$'
#### split from target  below ###
app_path=${target##*:}
ssh_host=${target%%:*}
####

if [ ! $jar ]; then
   echo 'Usage: deployless <jarFile>'
   echo '  e.g. deployless test.jar'
   echo '  -d  --delete 删除资源包'
   echo '  -f  --force  强制装配资源包'
   echo '  -l  --list   显示云端已装配资源包列表'
   exit
fi

if [[ "$option" =~ $force ]] || [[ "$option" =~ $delete ]] || [[ "$option" =~ $list ]]; then
   jar=$2
   if [[ "$option" =~ $delete ]]; then
      echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option $jar\"
      ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option $jar"
      exit
   fi
   if [[ "$option" =~ $list ]]; then
      echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
      ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
      exit
   fi
fi

if [ ! -f $jar ]; then
   echo File $jar not exist
   exit
fi

if [[ ! $jar =~ .jar$ ]]; then
   echo $jar isn\'t a jar file.
   exit
fi

## deploy lib
deploy_lib() {
   echo scp $(readlink -f $jar) ${target}/lib
   scp $(readlink -f $jar) ${target}/lib
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
}

deploy_lib
# done
echo Done
