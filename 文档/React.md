### 2025 React

##### 一，创建react脚手架

```vue
命令 npx create-react-app 项目名称
  "name": "2025_react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "web-vitals": "^2.1.4" // 性能检测工具
  },
  "scripts": {
    "start": "react-scripts start", // 开发环境
    "build": "react-scripts build", // 生产环境
    "test": "react-scripts test", // 单元测试
    "eject": "react-scripts eject" // 暴露webpack配置规则
  },
  "eslintConfig": { // 词法检测 },
  "browserslist": { // 基于 browserslist 规范，这只浏览器的兼容兼容情况
    "production": [
      ">0.2%", // 使用率超过 0.2% 的浏览器
      "not dead", // 不考虑 IE
      "not op_mini all" // 不考虑欧朋浏览器
    ],
  }

命令 treer -i "node_modules" 获取项目文件树
├─package-lock.json
├─package.json
├─README.md
├─文档
| └React.md
├─src
|  └index.js
├─scripts
|    ├─build.js  							后期执行相关打包命令的入口文件
|    ├─start.js
|    └test.js
├─public
|   ├─favicon.ico
|   └index.html
├─config
|   ├─env.js
|   ├─getHttpsConfig.js
|   ├─modules.js
|   ├─paths.js                              打包中需要的一些路径
|   ├─webpack.config.js					 	webpack 配置
|   ├─webpackDevServer.config.js 			webpack-dev-serve配置
|   ├─webpack
|   |    ├─persistentCache
|   |    |        └createEnvironmentHash.js
|   ├─jest
|   |  ├─babelTransform.js
|   |  ├─cssTransform.js
|   |  └fileTransform.js
```

##### 二，配置 less less-loader 插件

```
npm i less less-loader@8
在webpack.config.js配置less less-loadder插件
找到原来 sass 处理器位置修改成 less
1. const sassRegex = /\.(scss|sass)$/;
   const sassModuleRegex = /\.module\.(scss|sass)$/;
   替换
   const lessRegex = /\.less$/;
   const lessModuleRegex = /\.module\.less$/;
2. 找到 webpackEnv 函数，找到 module 
   sassRegex
   sassModuleRegex
   'sass-loader'
   替换
   lessRegex
   lessModuleRegex
   'less-loader'
```

