#!/usr/bin/bash
VERSION='deployless 1.1.28 2020-10-28 LTS'
## host ##
target='root@server_ip:/root/dev/api'
app_path=${target##*:}
ssh_host=${target%%:*}

init() {
   os_name=$(uname)
   if [[ $os_name == 'Darwin' ]];then  ## MAC
      if [ ! type greadlink >/dev/null 2>&1 ]; then
         brew install coreutils
      fi
      ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
   fi
}

import_db() {
   sql=$2
   if [ ! -f $(readlink -f $sql) ]; then
      echo File not found.
      exit
   elif [[ ! $sql =~ .sql$ ]]; then
      echo $sql isn\'t a SQL file.
      exit
   fi
   echo scp $(readlink -f $sql) ${target}/../mysql/tmp
   scp $(readlink -f $sql) ${target}/../mysql/tmp
   ssh $ssh_host "cd $app_path/../mysql && sh docker-deploy-db.sh -i $2"
   exit
}

export_db() {
   if [ $# -ne 3 ];then
      usage
   else
      ssh $ssh_host "cd $app_path/../mysql && sh docker-deploy-db.sh -e $2" >$3
      echo Result file path: $(readlink -f $3)
   fi
   exit
}

replace_standalone() {
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
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh -r $2"
   exit
}

deploy_lib() {
   jar=$1
   if [ ! -f $(readlink -f $jar) ]; then
      usage
      exit
   elif [[ ! $jar =~ .jar$ ]]; then
      echo $jar isn\'t a jar file.
      exit
   fi
   echo scp $(readlink -f $jar) ${target}/lib
   scp $(readlink -f $jar) ${target}/lib
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $jar\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $jar"
   exit
}

deploy_lib_force() {
   jar=$2
   if [ ! -f $(readlink -f $jar) ]; then
      usage
      exit
   elif [[ ! $jar =~ .jar$ ]]; then
      echo $jar isn\'t a jar file.
      exit
   fi
   echo scp $(readlink -f $jar) ${target}/lib
   scp $(readlink -f $jar) ${target}/lib
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh -f $jar\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh -f $jar" 
   exit
}

deploy_lib_by_maven() {
   jar=$2
   num=$(echo $jar | awk -F":" '{print NF-1}')
   if [ $jar ]; then
      if [ $num -eq 0 ]; then
         jar="com.jfeat:${jar}:1.0.0"
      elif [ $num -eq 1 ]; then
         jar="com.jfeat:${jar}"
      fi
   else
      usage
   fi
   echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh -m $jar\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh -m $jar"
   exit
}

delete_lib() {
   if [ $# -ne 2 ]; then
      usage
   else
      option=$1
      jar=$2
      if [ $jar ]; then
         echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh -d $jar\"
         ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh -d $jar"
      fi
   fi
   exit
}

list_lib() {
   if [ $# -ne 1 ]; then
      usage
   else
      option=$1
      echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh -l\"
      ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh -l"
   fi
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

list_table() {
   ssh $ssh_host "cd $app_path/../mysql && sh docker-deploy-db.sh -l"
   exit
}

# code_generate() {
#    if [ $# -ne 3 ]; then
#       usage
#    elif [ ! -f $2 ] || [[ ! $2 =~ .sql$ ]] || [ ! -f $3 ] ||  [[ ! $3 =~ .json$ ]]
#          echo ''
#          echo 'Invaild file variables(*.sql,*.crud.json), code generate MUST use by *.sql and *.json config files.'
#          echo ''
#          echo 'You can generate config files with crudless-cli.'
#          echo 'git clone https://github.com/kequandian/hub.crudless.zerocode.git'
#          exit
#    else
#       echo scp $(readlink -f $jar) ${target}/lib
#       scp $(readlink -f $jar) ${target}/lib
#       echo ssh $ssh_host \"cd $app_path exec sh docker-deploy-lib.sh $jar\"
#       ssh $ssh_host "cd $app_path && sh docker-deploy-lib.sh $jar"
#    fi
# }

usage() {
   echo ''
   echo 'Usage: bash deployless.sh [command] <parameter>'
   echo '  e.g. bash deployless.sh test.jar              默认执行装配操作'
   echo ''
   echo '  -d  --delete <jarName>                        删除资源包'
   echo '  -e  --export <tableName> <savePath>           导出云端数.据库'
   echo '  -f  --force  <jarFilePath>                    强制装配资源包'
   echo '  -h  --help                                    显示使用帮助'
   echo '  -i  --import <sqlFilePath>                    导入SQL文件'
   echo '  -l  --list                                    显示基础包中资源列表'
   echo '  -lt --list-table                              显示数据库列表'
   echo '  -m  --maven  <groupId:artifactId:Version>     从Remote Repository拉取资源包并装配'
   echo '  -s  --ssh                                     免密验证'
   echo '  -r  --replace <standaloneJarFilePath>         全量替换standalone.jar（app.jar）包'
   echo '  -v  --version                                 显示sandbox版本信息'
   exit
}

version() {
   echo $VERSION
   exit
}

init

if [ $# -eq 0 ]; then
   usage
fi

while [ -n "$1" ]; do
   case $1 in
   -d | --delete) delete_lib "$@" ;;
   -e | --export) export_db "$@" ;;
   -f | --force) deploy_lib "$@" ;;
   -h | --help) usage ;;
   -i | --import) import_db "$@" ;;
   -l | --list) list_lib ;;
   -lt| --list-table) list_table ;;
   -m | --maven) deploy_lib_by_maven "$@" ;;
   -s | --ssh) ssh_copy_id ;;
   -r | --replace) replace_standalone "$@" ;;
   -v | --version) version ;;
   *) deploy_lib "$@" ;;
   esac
   shift
done