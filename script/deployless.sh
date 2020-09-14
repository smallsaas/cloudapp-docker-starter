#!/usr/bin/bash
jar=$1
option=$1
## host ##
target='root@server_ip:/root/dev/api/'
force='^-f$'
delete='^-d$'
list='^-l$'
ssh='^-s$'
replace='^-r$'
#### split from target  below ###
app_path=${target##*:}
ssh_host=${target%%:*}
####

deploy_lib() {
   echo scp $(readlink -f $jar) ${target}/lib
   scp $(readlink -f $jar) ${target}/lib
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
}

ssh_copy_id() {
   rsa_path='.ssh\\id_rsa.pub'
   cd ~
   which "ssh-copy-id -h" >/dev/null 2>&1
   if [ $? -eq 1 ]; then
      if [ ! -f $rsa_path ]; then
         ssh-keygen -t rsa
      fi
      echo ssh-copy-id -i ~/.ssh/id_rsa.pub $ssh_host
      ssh-copy-id -i ~/.ssh/id_rsa.pub $ssh_host
   else
      echo 'Please install Git tool.'
   fi
   exit
}

usage() {
   echo 'Usage: deployless <jarFile>'
   echo '  e.g. deployless test.jar'
   echo '  -d  --delete <jarName> 删除资源包'
   echo '  -f  --force  <jarFilePath> 强制装配资源包'
   echo '  -l  --list   显示云端已装配资源包列表'
   echo '  -s  --ssh    保存本地ssh的公共密钥至云端'
   echo '  -r  --replace <standaloneJarFilePath> 全量替换standalone.jar（app.jar）包'
   exit
}

if [ ! $jar ]; then
   usage
fi

if [[ "$option" =~ '^-' ]]; then
   jar=$2
   if [[ "$option" =~ $delete ]]; then
      echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option $jar\"
      ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option $jar"
      exit
   elif [[ "$option" =~ $list ]]; then
      echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
      ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
      exit
   elif [[ "$option" =~ $ssh ]]; then
      ssh_copy_id
   elif [[ "$option" =~ $replace ]]; then
      echo scp $(readlink -f $jar) ${target}/lib
      scp $(readlink -f $jar) ${target}/lib
      echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $1 $2\"
      ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $1 $2"
      exit
   fi
fi

if [ ! -f $(readlink -f $jar) ]; then
   usage
   exit
elif [[ ! $jar =~ .jar$ ]]; then
   echo $jar isn\'t a jar file.
   exit
fi

deploy_lib
# done
echo Done
