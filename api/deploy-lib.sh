#!/bin/sh

################################
## define your var for lib deploy
export DL_STANDALONE='env-test-saas-1.0.0-standalone.jar'
export SQL_PATH='BOOT-INF/classes/db/migration'
export BOOT_INF_LIB='BOOT-INF/lib/'
################################

## main
standalone_jar=${DL_STANDALONE}
app='app.jar'
keep=2
webapp='/webapps'

# 切换至工作目录下
cd $webapp

# 判断是否存在lib资源文件夹
if [ ! -d ./lib ]; then
   echo './lib dir not found !' 1>&2 ##stderr
   exit 1
elif [ -z $(ls ./lib) ]; then
   echo 'no lib found under ./lib !' >/dev/stderr ## stderr
   exit 1
fi

## not defined, find it.
if [ ! $standalone_jar ]; then
   standalone_jar=$(ls *-standalone.jar)
fi

# 判断是否存在standalone_jar
if [ ! -f $standalone_jar ]; then
   standalone_jar=${app}
fi

if [ ! -f $app ]; then
   app=${standalone_jar}
fi

##
#if [ $standalone_jar != $app ]; then
#   echo mv $standalone_jar $app
#   mv $standalone_jar $app
#   echo $standalone_jar >.standalone
#elif [ -f .standalone ]; then
#   standalone_jar=$(cat .standalone)
#fi
##

if [ ! $standalone_jar ]; then
   echo 'no pattern of *-standalone.jar info found !' 1>&2
   exit 1
fi

# 复制待注入lib包的副本app.jar
fixapp='app-fix.jar'
if [ ! -f lib/$fixapp ]; then
   echo cp $app lib/$fixapp 1>&2
   cp $app lib/$fixapp
fi

## iterate lib
cd lib
num=0
## 遍历提取lib包至BOOT-INF/lib,以便直接注入至JAR包
for lib in $(ls); do
   echo Packing $lib ...
   if [ $lib != $fixapp ]; then
      num=$(($num + 1))
      ## new lib
      inf_dir=BOOT-INF/lib
      if [ ! -d $inf_dir ]; then
         mkdir -p $inf_dir
      fi
      #echo mv $lib $inf_dir 1>&2
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
      echo searching in $lib
	  ## 搜索lib资源包中是否存在sql文件
      sql=$(jar tf ${BOOT_INF_LIB}${lib} | grep sql)
      ## 判断lib包是否存在sql文件
      if [ "$sql" ]; then
         echo extract sql dir
		 ## 提取sql资源包
         jar xvf ${BOOT_INF_LIB}${lib} sql 
		 ## 更改sql文件夹名称 为 db/migration方便后续注入
		 mkdir -p $SQL_PATH
		 mv sql/* $SQL_PATH
		 ## 遍历重命名SQL文件以便支持migration
		 for sql in $(ls $SQL_PATH); do
			echo rename $sql to R__$sql
			mv $SQL_PATH/$sql $SQL_PATH/R__$sql
		 done
		 echo inject sql
		 echo jar 0uf $fixapp $SQL_PATH
		 ## 将SQL注入至db/migration
		 jar 0uf $fixapp $SQL_PATH
      fi
      echo inject lib
      echo jar 0uf $fixapp ${BOOT_INF_LIB}$lib
	  ## 注入lib资源包
      jar 0uf $fixapp ${BOOT_INF_LIB}$lib
   done
fi

## working dir
cd ..;

## rollback
rollback_issue=${standalone_jar}.rollback_$(date "+%m-%d")
if [ -f $rollback_issue ];then
   rm -f $rollback_issue
fi
if [ -f $app ];then
   echo mv $app $rollback_issue
   mv $app $rollback_issue

   # Usage: predeploy.sh rollback keep <pattern> <num>
   if [ -f /usr/local/bin/predeploy.sh ];then
      bash /usr/local/bin/predeploy.sh rollback keep ${standalone}.rollback_ $keep
   elif [ -f ./predeploy.sh ];then
      bash ./predeploy.sh rollback keep ${standalone_jar}.rollback_ $keep
   fi
fi

##
#deploy
echo mv lib/$fixapp $app
mv lib/$fixapp $app

#cleanup 
echo rm -rf lib/*
rm -rf lib/*


echo "deploy-lib.sh exec success"

