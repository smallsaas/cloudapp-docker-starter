# crudless-docker-sandbox说明文档

## :dart:0. 使用目的

本项目旨在提供**一套完整的`docker-compose`标准工程文件**，配合本说明文档，能够在极短的时间内配置出一套使用`docker-compose`编排的**服务架构体系**，能够在其运行后使用工具往内部**注入服务**、**可视化页面**等并实时更新的效果，最终达到**轻部署、易扩展且广适配**的云应用。

## :tokyo_tower:1. 项目结构

>**Tips：下述项目结构文件夹不建议重命名，因脚本支持原因，重命名文件夹将导致大量脚本失效！**

>**挂载区：本项目采用Docker部署方式运行，应用Docker机制，为每个关键组件提供一个独立文件夹*（挂载区）*用于组件容器的空间映射。**

- **api-src**：存储一套可立即通过`mvn package`生成可运行的`*-standalone.jar`文件。
- **api**：`docker-compose.yml`中**云应用API接口组件**挂载区，云应用API文件夹，用于**运行接口、存储文件**等功能。
- **mysql**：`docker-compose.yml`中**MySQL数据库组件**挂载区，也是云应用MySQL文件夹，用于**存储数据文件、记录日志**等功能。
- **nginx**：`docker-compose.yml`中**Nginx反向代理组件**挂载区，用于整个应用**访问地址路由、服务转发**等功能。
- **script**：本项目的**所有原始脚本文件**都集中于该文件夹下，方便后续开发者自行扩展。
- **web**：`docker-compose.yml`中**Web页面组件**挂载区，也是云应用页面视图文件夹，用于**提供应用前端视图，存放资源文件**等功能。
- **docker-compose.yml**：标准`docker-compose`编排初始模板，内含`API`、`Web`、`MySQL`和`Nginx`等四个关键组件，可自行扩展或修改配置。
- **greenfield.sh**：用于**初始化标准Docker云应用**的脚本文件，初次使用请在同级目录下执行`sh greenfiled.sh`查阅帮助文档。

## :earth_asia:2. 运行环境

>**Tips：此处工具版本并非必须保持完全一致，但必须确保已安装，若部署失败，可查看是否由工具版本造成，下述工具版本经过实机测试，不存在版本问题，可搭配使用。**

>**其中各个工具安装过程可自行在互联网查阅相关安装与教程资料，本文将不再赘述。**

>**Apache Maven：下载 [settings.xml](http://zele.pro:8000/devops/settings.xml) 文件 *（用于配置 apache archive 私服授权）* ,并保存于`maven/conf/`目录下。**

|                          Tools                           | Version |
| :------------------------------------------------------: | :-----: |
|                         **Git**                          | 2.28.0  |
|                         **JDK**                          |   11    |
|                        **Maven**                         |  3.6.3  |
|                        **Docker**                        | 19.03.8 |
|                       **Node.JS**                        | 12.18.3 |
| **[zero-json](https://github.com/kequandian/zero-json)** |  2.7.0  |
|                    **docker-compose**                    | 1.25.0  |

## ⚡3. 快速拉取

可使用**Git / SVN工具**快速将本部署模板拉取至服务器，具体命令如下所示。

### a. Git

```shell
$ git clone https://github.com/smallsaas/crudless-docker-sandbox.git
```

### b. SVN

```shell
$ svn checkout https://github.com/smallsaas/crudless-docker-sandbox.git
```

## :memo:4. 快速配置

### a. 初始化配置

>**Tips：**

切换至部署模板目录下，**运行初始化脚本**，可看到`greenfield.sh`脚本工具帮助文档说明，如下所示。

```shell
$ sh greenfield.sh
Usage: greenfield.sh <app> <port> <database>
   Option:
      app       - app name a.w.a. prefix of docker container name
      port      - expose port from host
      database  - database name
```

随后根据脚本工具说明**补全参数后再次执行初始化脚本**，如下所示。

```shell
$ sh greenfield.sh test 8888 test
Initialize application.yml successfully.
...
...
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  xx.xxx s
[INFO] Finished at: 20xx-xx-xxTxx:xx:xx+xx:xx
[INFO] ------------------------------------------------------------------------
```

看到上述`Initialize *.sh successfully`与`BUILD SUCCESS`同时出现，则说明本模板**初始化成功**，已成功构建一个云应用模板，**应用名称为`test`，测试端口号为`8888`，数据库名称为`test`**。

### b. 初始化页面

>**Tips：`npm install`过程较久，属正常现象，请耐心等待。**

切换至web文件夹下，执行`npm install`命令安装web所需依赖，安装完成后可执行`npm start`进行测试是否可正常运行。

---

至此，**初始化配置完成**。

## :dash:5. 正式部署

执行完上述初始化后，切换路径至项目根目录处 *（与`docker-compose.yml`文件夹同级目录）* ，执行`docker-compose up`指令，观察是否执行成功，具体指令如下所示：

```shell
$ cd ~/crudless-docker-sandbox
$ docker-compose up   ## 可实时查看log
$ # docker-compose up -d  ## 应用后台运行
```

启动完成后，可通过`docker-compose ps`指令**查看各组件运行情况**。

## :pushpin:6. 资源管理

资源管理则是整个sandbox的核心部分，通过资源管理可实现将本地的 **服务 / 页面** 装配至云端sandbox中，从而快速地进行测试。

>**待装配资源：所有可装配Jar包**，如env-test-saas服务中使用`mvn package`生成的target目录下的`*-1.0.0.jar`资源和`crud-core-1.0.0.jar`统称为**待装配资源**。
>
>**Web Page：**使用**zero-json工具**生成的前端项目目录通常包含`src/pages`文件夹，其文件夹下的`login`则对应登录页面，后续所述Web Page则对应相应的该文件夹下的**page文件**。

>**Tips：本部署模板已提供资源管理的脚本工具文件，位于`api-src/*.sh`，其中`deployless.sh`用于资源包管理使用，`deployless_page.sh`用于Web Page自动装配使用，进行资源管理前请确保云应用已成功正式部署。**
---

到sandbox部署根目录后拷贝`./api-src`下的`deployless.sh`和`deployless_pages.sh` 两份文件至本地 ，*（其中`deployless_pages.sh`必须放置在待装配Web Pages同级目录下，**e.g. 待装配page位于`src/pages/`，则将脚本文件放置于`src/pages/`目录下**）* ，随后编辑该脚本文件，配置文件起始部分中的`target`变量。具体文件说明与示例如下所示，修改完成后保存。

- `deployless.sh`：用于**管理资源包的脚本工具文件**。
- `deployless_pages.sh`：用于**装配Web Page的脚本工具文件**。

- 配置两份脚本文件中的`target`变量（其组成规则为 **“用户名@服务器IP:本项目在服务器存储位置”** ），如下所示

```shell
# 分别修改deployless.sh / deployless_pages.sh文件
# 服务器ip：server_ip
# 用户名：root
# 本项目在服务器存储位置：/root/dev/crudless-docker-sandbox/api or web
# 其中deployless.sh中的路径需精确到api目录，而deployless_pages.sh中的路径需要精确到web目录
## host ##
target='root@server_ip:/root/dev/crudless-docker-sandbox/api or /web'
```

### deployless.sh

`deployless.sh`具体使用方法如下所示。

```shell
$ bash deployless.sh
Usage: deployless <jarFile>
  e.g. deployless d:/desktop/env-fault.jar
  -d  --delete 删除资源包
  -f  --force  强制装配资源包
  -l  --list   显示云端已装配资源包列表
```

#### a. 装配资源包

<<<<<<< HEAD
**执行`deployless.sh`脚本文件**  ，例如装配放置在`d:desktop`中名称为`test.jar`的资源包，则运行如下装配指令。
=======
在 **<u>待装配资源包同级目录下</u>**  **执行`deployless.sh`脚本文件**   ，例如装配名称为`test.jar`的资源包，则运行如下装配指令。
>>>>>>> 3c14ee0b5157b52636548f2533c2e923ede30655

```shell
$ bash deployless.sh d:/desktop/test.jar
```

#### b. 强制装配资源包

<<<<<<< HEAD
强制装配资源包用于**忽略依赖冲突所使用**，当正常装配资源包时，脚本工具将 **对资源包与云端sandbox** 进行依赖比对，判断所上传资源包是否能够注入。当无法注入时，将返回依赖对比信息，如下所示*（依赖冲突信息可用于处理使用）*。
=======
强制装配资源包用于**忽略依赖冲突所使用**，当正常装配资源包时，脚本工具将 **对资源包与云端sandbox** 进行依赖比对，判断所上传资源包是否能够注入。当无法注入时，将返回依赖对比信息，如下所示 *（依赖冲突信息可用于处理使用）* 。
>>>>>>> 3c14ee0b5157b52636548f2533c2e923ede30655

```bash
$ bash deployless.sh test.jar
.....
Packing test.jar ...

matches
                        crud-dev-0.0.1.jar
app-fix.jar-mismatches
                        crud-core-0.0.5.jar
                        crud-plus-0.1.0.jar
                        ......
                        spring-boot-starter-jdbc.jar
                        spring-boot-starter-test.jar
test.jar-mismatches
                        crud-core-0.21.5.jar
                        crud-plus-0.1.1.jar

test.jar CAN'T be injected into env-test-saas-1.0.0-standalone.jar

no lib to deploy !
Done
```

当需**忽略依赖冲突强制装配**时，则可使用以下指令。

```shell
$ bash deployless.sh -f test.jar
```

#### c. 查看已有资源包

可通过`-l`指令参数**查看云端已装配的资源包**，可供后续进行管理，具体指令如下所示。

```shell
$ bash deployless.sh -l
spring-boot-starter-jdbc.jar
flyway-core-5.2.4.jar
......
crud-dev-0.0.1.jar
crud-plus-0.1.0.jar
crud-core-0.0.5.jar
```

#### d. 卸载资源包

卸载资源包操作仍使用`deployless.sh`脚本文件执行，只需在命令中指定`-d`参数即可完成卸载资源包操作，具体例子如下所示 *（假设下述执行卸载Jar包为`test.jar`的资源包）*：

```shell
$ bash deployless.sh -d test.jar
```

### deployless_pages.sh

`deployless_pages.sh`具体使用方法如下所示：

```shell
$ bash deployless_pages.sh
Usage: deployless <page_name> <route_name> <router_path>
  e.g. deployless page_test 菜单名称 page_test
```

#### a. 装配Web Page

在待装配Web Page同级目录下**执行该脚本文件** ，例如装配名称为`test_page`的页面模块并**配置菜单路由**，则运行如下指令。

```shell
$ sh deployless_pages.sh test_page 菜单名称 test_page
```

## :seedling:7. 测试用例

>**测试目标：env-test-saas服务**
>
>**服务地址：devops@zele.pro:/home/devops/repo/env/env-test-saas.git**
>
>**测试内容：在完成sandbox部署的条件下，将通过本地测试的env-test-saas服务装配至sandbox并测试通过。**
>
>**期望结果：成功实现资源管理且装配后该服务中的接口与页面能够正常使用。**

### a. 测试流程

![测试流程](https://gitee.com/zchengb/image/raw/master///20200831113809.jpg)

### b. 测试说明

- 云端启动sandbox；
- 通过Git Bash拉取env-test-saas项目；
- 使用`mvn package`打包项目；
- 从sandbox中的`api-src`下载`deployess.sh`与`deployless_pages.sh`脚本文件；
- 修改脚本文件中的target值；
- 使用deployless.sh**装配env-test-saas的Jar包**；
- 使用deployless_pages.sh**装配env-test-saas的页面page**；
- 使用Postman工具**测试接口是否存在且成功调用**；
- 使用deployless.sh**卸载env-test-saas的Jar包**；
- 使用Postman工具**测试接口是否已失效**；
- 通过上述所有用例则说明测试成功。

