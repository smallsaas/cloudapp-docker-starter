#!/bin/sh
mod=$1
routeName=$2
routePath=$3

if [ ! -f ${mod}.tar ]; then
   echo ${mod}.tar not exists
   exit
fi

if [ ! $routeName ]; then
   echo 'routeName is NULL'
   exit
fi

if [ ! $routePath ]; then
   echo 'routePath is NULL'
   exit
fi

if [ -d $mod ]; then
   # echo mv $mod ../backup/${mod}_page_$(date "+%Y-%m-%d_%H-%M")
   # mv $mod ../backup/${mod}_page_$(date "+%Y-%m-%d_%H-%M")
   echo ${mod}' is already EXIST.'
   rm -f ${mod}.tar
   exit
fi

## un tar $mod.tar
echo tar -xvf ${mod}.tar
tar -xvf ${mod}.tar
echo rm -f ${mod}.tar
rm -f ${mod}.tar

echo 'replace router.json...'

zero-json router create ${routeName} ${routePath} -i ../config/router.config.js