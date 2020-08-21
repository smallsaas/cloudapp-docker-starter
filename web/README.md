## 环境
```
node version 10
npm version 6
```

## 安装

``` 
npm install
```

## 以开发环境运行

```
npm start
// 默认运行在本地的 8000 端口
```

## 以生产环境运行

```
npm run build
// 然后把生成的 dist/ 拷贝到 web server 下
```

## npm un build 提示找不到模块 'webpack'
电脑第一次构建前端的项目的话，需要先全局安装 webpack 相关模块
```
// 以管理员 (or root) 运行
npm install webpack -g
npm install webpack-cli -g
```
