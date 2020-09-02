#!/bin/sh
mod=$1
routeName=$2
routePath=$3
option=$1
delete='^-d$'

if [[ "$option" =~ $delete ]]; then
	mod=$2
	if [ -d $mod ]; then
		rm -rf $mod
		echo Success delete $mod
	else
		echo 'page not exists'
	fi
	exit
fi

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

## un tar $mod.tar
echo tar -xvf ${mod}.tar
tar -xvf ${mod}.tar
echo rm -f ${mod}.tar
rm -f ${mod}.tar

echo 'replace router.json...'

zero-json router create ${routeName} ${routePath} -i ../config/router.config.js