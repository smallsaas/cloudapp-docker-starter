#!/bin/sh
mod=$1
routerName=$2
routerPath=$3
option=$1
crudless='^-c'
delete='^-d$'
list='^-l$'
update='^-u$'
pages='./src/pages'

if [[ "$option" =~ $update ]]; then
	shift
	npm update $*
	node init
	exit
fi

cd $pages
if [[ "$option" =~ $delete ]]; then
	mod=$2
	if [ -d $mod ]; then
	    zero-json router remove ${mod} -i ../config/router.config.js -d
		rm -rf $mod
		echo Success delete $mod
	else
		echo 'page not exists'
	fi
	exit
elif [[ "$option" =~ $list ]]; then
	mod=$2
	ls -l |grep "^d" |awk '{print $9}'
	exit
elif [[ "$option" =~ $crudless ]]; then
	yml=$2
	apiName=$3
    pageName=$4
    routerName=$5
    routerPath=$6
	cd /web/tmp
    if [ -f ${yml##*/} ]; then
		crudless
		zero-json manage crud $pageName -i ./issue.json -o ../src/pages -d
		zero-json router create ${routerName} ${routerPath} -i ../src/config/router.config.js -d
	else
		echo File not exist.
	fi
	exit
fi

if [ ! -f ${mod}.tar ]; then
   echo ${mod}.tar not exists
   exit
fi

if [ ! $routerName ]; then
   echo 'routerName is NULL'
   exit
fi

if [ ! $routerPath ]; then
   echo 'routerPath is NULL'
   exit
fi

## un tar $mod.tar
echo tar -xvf ${mod}.tar
tar -xvf ${mod}.tar
echo rm -f ${mod}.tar
rm -f ${mod}.tar

echo 'replace router.json...'

zero-json router create ${routerName} ${routerPath} -i ../config/router.config.js -d