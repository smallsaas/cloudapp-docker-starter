#!/usr/bin/bash
VERSION='deployless_pages 1.0.27 2020-09-27 LTS'
## host ##
target='root@server_ip:/root/dev/web'
#### split from target  below ###
app_path=${target##*:}
ssh_host=${target%%:*}
####

init() {
   os_name=$(uname)
   if [[ $os_name == 'Darwin' ]];then  ## MAC
      if [ ! type greadlink >/dev/null 2>&1 ]; then
         brew install coreutils
      fi
      ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
   fi
}

## deploy page
deploy_page() {
   mod=$1
   routerName=$2
   routerPath=$3
   if [ ! -f $(readlink -f $mod)/index.js ]; then
      usage
   fi
   ## means page, check dist
   if [ ! -d $(readlink -f $mod)/config ]; then
      echo you try to deploy page, but config not exists
      exit
   fi
   ## package page with tar
   echo tar -cvf ${mod}.tar ${mod}
   tar -cvf $(readlink -f $mod).tar ${mod}
   echo scp ${mod}.tar $target/src/pages
   scp ${mod}.tar $target/src/pages
   ## clean after scp
   echo rm ${mod}.tar
   rm ${mod}.tar

   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh $mod $routerName $routerPath"
   exit
}

delete_page() {
   if [ $# -nq 3 ]; then
      usage
   fi
   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh $*\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh -d $2 $3"
   exit
}

list_page() {
   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh $*\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh -l"
   exit
}

deploy_yml() {
   if [ $# -lt 5 ]; then
      usage
   fi
   yml=$2
   apiName=$3
   pageName=$4
   routerName=$5
   routerPath=$pageName
   echo $yml
   if [ ! -f $(readlink -f $yml) ]; then
      echo you try to deploy yaml, but file not exists
      exit
   fi
   echo scp $yml $target/tmp
   scp $(readlink -f $yml) $target/tmp

   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh $yml $apiName $pageName $routerName $routerPath\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh -c $yml $apiName $pageName $routerName $routerPath"
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

update() {
   shift
   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh $*\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh -u $*"
   exit
}

usage() {
   echo ''
   echo 'Usage: bash deployless_pages.sh [command] <parameter>'
   echo '  e.g. bash deployless_pages.sh web/src/pages/page_test 菜单名称 page_test'
   echo ''
   echo '  -c  --crudless <yamlFilePath> <apiName> <pageName> <routerName> 快速生成代码并部署'
   echo '  -d  --delete <pageName> 删除页面'
   echo '  -h  --help   显示使用帮助'
   echo '  -l  --list   页面列表'
   echo '  -s  --ssh    免密验证'
   echo '  -u  --update <module_name> 更新sandbox web资源'
   echo '  -v  --version 显示sandbox版本信息'
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

while [ -n "$1" ]
do
case $1 in
   -c|--crudless) deploy_yml "$@";;
   -d|--delete) delete_page "$@";;
   -h|--help) usage;;
   -l|--list) list_lib;;
   -s|--ssh) ssh_copy_id;;
   -u|--update) update "$@";;
   -v|--version) version;;
   *) deploy_page "$@";;
esac
shift
done