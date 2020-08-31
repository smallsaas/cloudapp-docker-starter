#!/usr/bin/bash

mod=$1
routerName=$2
routerPath=$3

## host ##
target='root@dev.svcpaas.smallsaas.cn:/root/dev/web'
#### split from target  below ###
app_path=${target##*:} ## cur before :
ssh_host=${target%%:*}
####

if [ ! $mod ] || [ ! $routerName ] || [ ! $routerPath ]; then
   echo 'Usage: deployless <page_name> <route_name> <router_path>'
   echo '  e.g. deployless page_test 菜单名称 page_test'
   exit
fi

if [ ! -d $mod ]; then
   if [ ! -d ../${mod} ]; then
      echo page $mod not exists
      exit
   else
      cd ..
   fi
fi

## deploy page
deploy_page() {
   ## means page, check dist
   if [ ! -d ${mod}/config ]; then
      echo you try to deply page, but config not exists
      exit
   fi

   ## package page with tar
   echo tar -cvf ${mod}.tar ${mod}
   tar -cvf ${mod}.tar ${mod}
   echo scp ${mod}.tar $target/src/pages
   scp ${mod}.tar $target/src/pages
   ## clean after scp
   echo rm ${mod}.tar
   rm ${mod}.tar

   echo ssh $ssh_host \"cd $app_path/src/pages and exec deploy-page.sh\"
   ssh $ssh_host "cd $app_path/src/pages && sh deploy-page.sh $mod $routerName $routerPath"
}

## main  ##

if [ -f ${mod}/index.js ]; then
   deploy_page
fi

# done
echo Done
