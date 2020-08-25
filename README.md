# crudless-docker-sandbox说明文档

## :dart:0. 使用目的

本项目旨在提供**一套完整的`docker-compose`标准工程文件**，配合本说明文档，能够在极短的时间内配置出一套使用`docker-compose`编排的**服务架构体系**，能够在其运行后使用工具往内部**注入服务API**、**可视化页面**等并实时更新的效果，最终达到**轻部署、易扩展且广适配**的云应用。

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
Initialize deploy-page.sh successfully.
Initialize docker-deploy-lib.sh successfully.
Initialize docker-lib.sh successfully.
Initialize deployless_pages.sh successfully.
Initialize deployless.sh successfully.
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

## :pushpin:6. 自动装配

>**Tips：本部署模板已提供自动装配脚本工具文件，位于`api-src/*.sh`，其中`deployless.sh`用于API自动装配使用，`deployless_page.sh`用于Web Page自动装配使用，自动装配前请确保云应用已正式部署。**
---

拷贝`api-src`下的`deployless.sh`文件 *（或`deployless_pages.sh`文件）* 至本地**待装配API模块工程根目录下**  *（或待装配Web Pages同级目录下，**e.g. 待装配page位于`src/pages/`，则将脚本文件放置于`src/pages/`目录下**）* ，随后编辑该脚本文件，配置文件起始部分中的`target`变量，其组成规则为 **“用户名@服务器IP:本项目在服务器路径”** 。具体文件说明与示例如下所示，修改完成后保存。

- `deployless.sh`：用于装配API的脚本工具文件。
- `deployless_pages.sh`：用于装配Web Page的脚本工具文件。

- 修改两份脚本文件中的`target`变量

```shell
# 修改deployless.sh / deployless_pages.sh文件
# 服务器ip：server_ip
# 用户名：root
# 本项目在服务器存储位置：/root/dev/crudless-docker-sandbox/api or web
## host ##
target='root@server_ip:/root/dev/crudless-docker-sandbox/api or /web'
```

### a. 装配API

使用`mvn package`使待装配API生成`target`文件夹，其中包含资源包`*-x.x.x.jar`。

随后在在待装配API模块的工程根目录下**执行`deployless.sh`脚本文件**  ，例如装配名称为`test`的模块，则运行如下指令。

```shell
$ sh deployless.sh test
```

### b. 装配Web Page

在待装配Web Page同级目录下**执行该脚本文件** ，例如装配名称为`test_page`的页面模块并**配置菜单路由**，则运行如下指令。

```shell
$ sh deployless_pages.sh test_page t/t
```

