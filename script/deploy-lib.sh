#!/bin/bash

################################
## define your var for lib deploy
export DL_STANDALONE='app.jar'
export SQL_PATH='BOOT-INF/classes/db/migration'
export BOOT_INF_LIB='BOOT-INF/lib/'
################################

## main
option=$1
crudless='^-c$'
delete='^-d$'
force='^-f$'
list='^-l$'
maven='^-m$'
replace='^-r$'
standalone_jar=${DL_STANDALONE}
app='app.jar'
keep=2
webapp='/webapps'

# 切换至工作目录下
cd $webapp

if [ ! -f $app ]; then
	app=${standalone_jar}
fi

if [ ! $standalone_jar ]; then
	echo 'no pattern of *-standalone.jar info found !' 1>&2
	exit 1
fi

# 复制待注入lib包的副本app.jar
fixapp='app-fix.jar'
if [ ! -f lib/$fixapp ]; then
	cp $app lib/$fixapp
fi

## iterate lib
cd lib

jar=$2
jar=${jar##*/}
## delete
if [[ "$option" =~ $delete ]] && [ $jar ]; then
	result=$(zip -d $fixapp BOOT-INF/lib/$jar | sed -n '$p')
	if [[ ! $result =~ "error" ]]; then
		mv $fixapp ../$app
	else
		echo $result
	fi
	exit
elif [[ "$option" =~ $list ]]; then
	java -jar ../dependency.jar -p $(readlink -f $fixapp)
	exit
elif [[ "$option" =~ $crudless ]]; then
	java -jar ../cg-cli.jar $jar $3 $4
	cd jar
	mvn package
	mv ./target/*-1.0-SNAPSHOT.jar ../
	cd ..
	if [[ $(pwd) =~ 'lib' ]]; then
		rm -rf $(ls | egrep -v '*.jar')
	fi
elif [[ "$option" =~ $replace ]] && [ -f $jar ]; then
	mvn dependency:get -Dartifact=org.flywaydb:flyway-core:5.2.4 -Ddest=./
	mv ./$jar $fixapp
	option='-f'
elif [[ "$option" =~ $maven ]]; then
	mvn dependency:get -Dartifact=$2 -Ddest=./
	option='-f'
fi

num=0
## 遍历提取lib包至BOOT-INF/lib,以便直接注入至JAR包
for lib in $(ls); do
	if [ $lib != $fixapp ]; then
		result=$(java -jar ../dependency.jar -cb $(readlink -f $fixapp) $(readlink -f $lib) | sed -n 1p)
		if [ "$result" = "false" ] && [[ ! "$option" =~ $force ]]; then
			echo
			java -jar ../dependency.jar -c $(readlink -f $fixapp) $(readlink -f $lib)
			echo
			echo $lib CAN\'T be injected into ${DL_STANDALONE}
			echo
			rm -rf $lib
			continue
		fi
		num=$(($num + 1))
		## new lib
		inf_dir=BOOT-INF/lib
		if [ ! -d $inf_dir ]; then
			mkdir -p $inf_dir
		fi
		mv $lib $inf_dir
	fi
done

## 判断上述遍历结果
if [ $num -eq 0 ]; then
	echo 'no lib to deploy !' 1>&2
	exit 1
fi

## prepare done
## start deploy lib
## 判断是否存在BOOT-INF文件夹是否存在
if [ -d BOOT-INF ]; then
	for lib in $(ls $BOOT_INF_LIB); do
		## 搜索lib资源包中是否存在sql文件
		sql=$(jar tf ${BOOT_INF_LIB}${lib} | grep sql)
		## 判断lib包是否存在sql文件
		if [ "$sql" ]; then
			## 提取sql资源包
			jar xf ${BOOT_INF_LIB}${lib} sql
			## 更改sql文件夹名称 为 db/migration方便后续注入
			mkdir -p $SQL_PATH
			mv sql/* $SQL_PATH
			## 遍历重命名SQL文件以便支持migration
			for sql in $(ls $SQL_PATH); do
				echo rename $sql to R__$sql
				mv $SQL_PATH/$sql $SQL_PATH/R__$sql
			done
			## 将SQL注入至db/migration
			jar 0uf $fixapp $SQL_PATH
		fi
		## 注入lib资源包
		jar 0uf $fixapp ${BOOT_INF_LIB}$lib
	done
fi

## working dir
cd ..

#deploy
mv lib/$fixapp $app

#cleanup
rm -rf lib/*

echo "deploy-lib.sh exec success"
