### 2025 React

##### 一，创建react脚手架

```vue
命令 npx create-react-app 项目名称
package.json文件配置
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
2. 找到 webpackEnv 函数，找到 module 模块
   sassRegex
   sassModuleRegex
   'sass-loader'
   替换
   lessRegex
   lessModuleRegex
   'less-loader'
```

##### 三，配置路径别名 @

```
找到 webpackEnv 函数，找到 resolve 模块里面的 alias 对象，添加 '@':paths.appSrc
```

##### 四，修改启动域名和端口号

```
在 start.js 文件中找到
	const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
	const HOST = process.env.HOST || '0.0.0.0';
	替换
	const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
	const HOST = process.env.HOST || '127.0.0.1';
	
通过环境变量修改
下载插件 npm i cross-env
在package.json文件找到 scripts 启动命令处
	"start": "node scripts/start.js",
	替换
	"start": "cross-env  PORT=8080 node scripts/start.js",
```

##### 五，修改浏览器兼容

```
在 index.jsx 入口文件添加
	import 'react-app-polyfill/ie9';
	import 'react-app-polyfill/ie11';
	import 'react-app-polyfill/stable';
兼容 ie9 ie11 stable
```

##### 六，配置跨域代理

```
在 src 目录下创建 setUpProxy.js 文件
下载插件 http-proxy-middleware

1. http-proxy-middleware2.0写法

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/jian", {
            target: "https://www.jianshu.com/asimov",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "^/jian": "" }
        })
    )
    app.use(
        createProxyMiddleware("/zhi", {
            target: "https://new-at.zhihu.com/api/4",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "^/zhi": "" }
        })
    )
}

2. http-proxy-middleware3.0写法

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/jian',
        createProxyMiddleware({
            target: 'https://www.jianshu.com/asimov',
            changeOrigin: true,
            pathRewrite: { '^/jian': '' }
        })
    );
    app.use(
        '/zhi',
        createProxyMiddleware({
            target: 'https://new-at.zhihu.com/api/4',
            changeOrigin: true,
            pathRewrite: { '^/zhi': '' }
        })
    );
}
```

##### 七，React，Vue，Anglar(NG)

```
主流思想：
	不直接操作 DOM ，数据驱动视图更新
	数据发生改变时，页面会刷新
		构建了一套虚拟 DOM 到真实 DOM 的渲染体系
		有效的避免了 DOM 的重排和重绘
	操作 DOM 比较消耗性能(可能会导致重排重绘)

React框架采用的是 MVC 体系，Vue框架采用的是 MVVM 体系
```

##### 八，MVC 

```
MVC: model数据层 + view视图层 + controller控制层
	数据层受到改变，那么试图层则会刷新页面，试图层操作数据使得数据改变，根据需要更新数据层和试图层，作为数据层和试图层之间的桥梁，数据驱动视图来渲染，单向数据驱动
```

![](C:\Users\Admin\Desktop\2025_react\文档\MVC.png)

##### 九，MVVM

```
MVVM：model数据层 + vew视图层 + viewModel数据/视图监听层
	不管数据层还是视图层发生改变，都会通知另一方，数据驱动视图来渲染，视图也可以驱动数据来更改，双驱动
```

![](C:\Users\Admin\Desktop\2025_react\文档\MVVM.png)

##### 十，JSX构建视图

```
JSX：javaScript and html（xml）把 js 和 HTML 标签混合在一起，JSX 可以同时写 js 表达式和 HTML 标签

{number/string} : 值是啥，渲染啥
{boolean/undefined/null/Symbol/BigInt} : 空
{对象/正则/日期对象/函数} : 不支持
{数组} ： 渲染数组中的每一项

行内样式：需要基于对象格式处理，样式属性基于驼峰命名法
样式类名：class 替换成 className
注释：  {/*  */}
```

##### 十一，React 渲染流程

```

```





































