# Crudless-Docker-SandBox

## 1. 相关文档

- [使用说明](https://github.com/smallsaas/crudless-docker-sandbox/blob/master/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md)
- [资源管理](https://github.com/smallsaas/crudless-docker-sandbox/blob/master/%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86.md)

## 2. 更新日志

### 【2020-11-10】

- 新增支持脚本工具`deployless.sh`中端口`port`选项

### 【2020-09-28】

- 新增`deploy-db.sh、docker-deploy-db.sh`文件用于管理SandBox中的数据表
- 新增`mysql/tmp`文件夹用于存放导入数据表存放文件
- `deployless.sh / deployless-pages.sh`脚本文件功能中新增`-v --version`选项用于查看版本信息
- `deployless.sh`脚本文件功能中新增`-i --import`选项用于远程导入数据表
- `deployless.sh`脚本文件功能中新增`-e --export`选项用于远程导出数据表至本地
- `deployless.sh`脚本文件功能中新增`-lt --list-table`选项用于远程查看数据列表

### 【2020-09-19】

- 修改`deployless.sh`中的`-r --replace <standaloneJarFilePath>`逻辑处理方式 *（原先为判断是否包含flyway依赖，不包含则自动加入flyway依赖用于数据库版本管理，**现改为不作任何判断，进行全量替换**）*
- 修改`deploylessl.sh`的装配处理逻辑为如下
  - 当云端`api`模块中基础包 *（`app.jar`）* 不包含`flyway`时，默认忽略SQL文件直接装配
  - 当云端`api`模块中基础包 *（`app.jar`）* 包含时，作如下判断
    - 当且仅当基础包中`db/migratation`目录下**不存在该SQL文件**或flyway版本记录中**存在SQL文件值存在异常**（即`flyway_schema_history`表中**对应值success为0**），则进行SQL文件装配
    - 其他情况不做SQL文件装配
- `api`模块所使用的 `zelejs/allin-web:sandbox`镜像同步加入工具包`mysql-test.jar`（需重拉取镜像并重启该`api`模块）

### 【2020-09-15】

- `deployless.sh`脚本新增`  -m  --maven  <groupId:artifactId:Version>`选项用于**从Maven Remote Repository拉取资源包并装配**
- `Nginx`模块中新增`images`与`attachments`文件夹用于上传配置
- `deployless_pages.sh`脚本新增`-u  --update <module_name>`选项用于**更新sandbox中web资源**

### 【2020-09-14】

- `deployless.sh`脚本新增`-r  --replace <standaloneJarFilePath>`选项用于**全量替换standalone.jar（app.jar）包**
- `api`模块所使用基础包`pom.xml`新增`hutool-core-5.1.0.jar、lombok-1.18.4.jar`依赖
- `api`模块所使用的 `zelejs/allin-web:sandbox`镜像同步更新基础包`app.jar`  （需重拉取镜像并重启该`api`模块）
- `web`模块样式基础源码替换为`zero-json 2.7.9`生成的源码
- 同步更新`zelejs/node:sandbox`镜像（需重新拉取镜像并重启`web`模块）

### 【2020-09-13】

- 新增`swagger`组件
- `api`模块基础包新增`crud-image-1.0.1、crud-runtime-0.0.1、crud-tag-1.0.1、eav-2.1.1`依赖
- `api`模块所使用的 `zelejs/allin-web:sandbox`镜像同步更新基础包`app.jar`  （需重拉取镜像并重启该`api`模块）

### 【2020-09-11】

- `deployless_pages.sh`脚本文件新增`-c --crudless`选项，用于云端根据**yaml文件**生成代码并自动部署
- `zelejs/allin-web:sandbox`引入maven依赖与自定义`settings.xml`文件，需执行更新指令`docker pull zelejs/allin-web:sandbox`
- `zelejs/node:sandbox`的web模板加入`tmp`临时文件夹，需执行更新指令`docker pull zelejs/node:sandbox`
- `./script`路径下的脚本文件已更新`deployless*.sh、deploy*.sh、docker-deploy-*.sh`，需重新替换至对应的`api`，`web`模块文件夹下，替换完成后执行初始化项目命令`bash greenfield.sh appName port databasesName`

