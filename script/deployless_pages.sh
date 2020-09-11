#!/usr/bin/bash
## host ##
target='root@server_ip:/root/dev/web'
mod=$1
routerName=$2
routerPath=$3
crudless='^-c$'
delete='^-d$'
list='^-l$'
ssh='^-s$'
#### split from target  below ###
app_path=${target##*:}
ssh_host=${target%%:*}
####

## deploy page
deploy_page() {
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
}

deploy_yml() {
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

usage() {
   echo 'Usage: bash deployless_pages.sh [option] <parameter>'
   echo '  e.g. bash deployless_pages.sh web/src/pages/page_test 菜单名称 page_test'
   echo
   echo '  -c  --crudless <yamlFilePath> <apiName> <pageName> <routerName> 快速生成代码并部署'
   echo '  -d  --delete <pageName> 删除页面'
   echo '  -l  --list   页面列表'
   echo '  -s  --ssh    保存本地ssh的公共密钥至云端'
   exit
}

if [[ "${mod}" =~ $delete || "${mod}" =~ $list ]]; then
   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh $*\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh $*"
   exit
fi

if [[ "${mod}" =~ $ssh ]]; then
   ssh_copy_id
elif [[ "${mod}" =~ $crudless ]]; then
   if [ $# -lt 5 ]; then
      usage
   fi
   deploy_yml "$@"
fi

if [[ ! $mod || ! $routerName || ! $routerPath ]]; then
   usage
fi

if [ ! -d $(readlink -f $mod) ]; then
   echo page $mod not exists
   exit
fi

## main  ##
if [ -f $(readlink -f $mod)/index.js ]; then
   deploy_page
fi

# done
echo Done
