#!/usr/bin/bash
## host ##
target='root@server_ip:/root/dev/web/'
mod=$1
routerName=$2
routerPath=$3
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
      echo you try to deply page, but config not exists
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

if [[ "${mod}" =~ $delete || "${mod}" =~ $list ]]; then
   echo ssh $ssh_host \"cd $app_path and exec docker-deploy-page.sh $*\"
   ssh $ssh_host "cd $app_path && sh docker-deploy-page.sh $*"
   exit
fi

if [[ "${mod}" =~ $ssh ]]; then
   ssh_copy_id
fi

if [ ! $mod || ! $routerName || ! $routerPath ]; then
   echo 'Usage: bash deployless_pages.sh <page_path> <route_name> <router_path>'
   echo '  e.g. bash deployless_pages.sh web/src/pages/page_test 菜单名称 page_test'
   echo '  -d  --delete <pageName> 删除页面'
   echo '  -l  --list   页面列表'
   echo '  -s  --ssh    保存本地ssh的公共密钥至云端'
   exit
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
