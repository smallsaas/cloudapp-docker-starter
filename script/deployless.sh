#!/usr/bin/bash
jar=$1
option=$1
## host ##
target='root@server_ip:/root/dev/api/'
#### split from target  below ###
app_path=${target##*:}
ssh_host=${target%%:*}
####

replace_standalone(){
   jar=$2
   if [ ! -f $(readlink -f $jar) ]; then
      echo File not found.
      exit
   elif [[ ! $jar =~ .jar$ ]]; then
      echo $jar isn\'t a jar file.
      exit
   fi
   echo scp $(readlink -f $jar) ${target}/lib
   scp $(readlink -f $jar) ${target}/lib
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $1 $2\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $1 $2"
   exit
}

deploy_lib() {
   if [ ! -f $(readlink -f $jar) ]; then
      usage
      exit
   elif [[ ! $jar =~ .jar$ ]]; then
      echo $jar isn\'t a jar file.
      exit
   fi
   echo scp $(readlink -f $jar) ${target}/lib
   scp $(readlink -f $jar) ${target}/lib
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
   exit
}

deploy_lib_by_maven() {
   jar=$2
   num=`echo $jar | awk -F":" '{print NF-1}'`
   if [ $jar ]; then
      if [ $num -eq 0 ]; then
         jar="com.jfeat:${jar}:1.0.0"
      elif [ $num -eq 1 ]; then
         jar="com.jfeat:${jar}"
      fi
   else
      usage
   fi
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $1 $jar\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $1 $jar"
   exit
}

delete_lib(){
   jar=$2
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option $jar\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option $jar"
   exit
}

list_lib(){
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $option\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $option"
   exit
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
   echo 'Usage: deployless [command] <parameter>'
   echo '  e.g. deployless.sh test.jar'
   echo ''
   echo '  -d  --delete <jarName> 删除资源包'
   echo '  -f  --force  <jarFilePath> 强制装配资源包'
   echo '  -l  --list   显示云端已装配资源包列表'
   echo '  -m  --maven  <groupId:artifactId:Version> 从Remote Repository拉取资源包并装配'
   echo '  -s  --ssh    保存本地ssh的公共密钥至云端'
   echo '  -r  --replace <standaloneJarFilePath> 全量替换standalone.jar（app.jar）包'
   exit
}

if [ $# -eq 0 ]; then
   usage
fi

while [ -n "$1" ]
do
case $1 in
   -d) delete_lib "$@";;
   -f) jar=$2;;
   -l) list_lib;;
   -m) deploy_lib_by_maven "$@";;
   -s) ssh_copy_id;;
   -r) replace_standalone "$@";;
   *) deploy_lib;;
esac
shift
done