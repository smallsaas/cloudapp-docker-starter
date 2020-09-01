#!/usr/bin/bash

mod=$1
routerName=$2
routerPath=$3
delete='^-d$'

## host ##
target='root@server_ip:/root/dev/web/'
#### split from target  below ###
app_path=${target##*:}
ssh_host=${target%%:*}
####

if [[ "${mod}" =~ $delete ]]; then
   echo ssh $ssh_host \"cd $app_path/src/pages and exec deploy-page.sh $*\"
   ssh $ssh_host "cd $app_path/src/pages && sh deploy-page.sh $*"
   exit
fi

if [ ! $mod ] || [ ! $routerName ] || [ ! $routerPath ]; then
   echo 'Usage: bash deployless_pages.sh <page_path> <route_name> <router_path>'
   echo '  e.g. bash deployless_pages.sh web/src/pages/page_test 菜单名称 page_test'
   echo '  -d  --delete 删除页面'
   exit
fi

if [ ! -d $(readlink -f $mod) ]; then
   echo page $mod not exists
   exit
fi

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

   echo ssh $ssh_host \"cd $app_path/src/pages and exec deploy-page.sh\"
   ssh $ssh_host "cd $app_path/src/pages && sh deploy-page.sh $mod $routerName $routerPath"
}

## main  ##
if [ -f $(readlink -f $mod)/index.js ]; then
   deploy_page
fi

# done
echo Done
