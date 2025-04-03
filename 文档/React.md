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

##### 十一，JSX底层处理机制

```
1. 把我们编写的 JSX 语法，编译成为虚拟 DOM 对象(virtualDOM: 框架内部构建的一套对象体系，对象属性描述出视图中 DOM 节点的相关特征)
	@1 基于 bael-peset-react-app 把 JSX 语法编译成React.createElement(...)格式
	@2 再把 createElement 方法执行，创建虚拟 DOM
		JSX语法
		<div id="app">
        	Hello, <span>world!</span>
      	</div>
		转换
		React.createElement(
			'div',
			{
         		id: 'app',
      		},
      		 "Hello,",
         	React.createElement("span",null，world!)      
		)
		React.createElement函数：
			参数1 ele：元素标签(组件)名称
			参数2 props：元素属性对象，没有则为null
			参数3以及后面参数 ...chilren：元素  子节点
		React.createElement返回值：虚拟 DOM 对象(4个属性)
			key: 循环渲染所需要的key
			props: 存放本身的属性和以及所有子节点cjildren
			ref: 节点或组件实例	
			type: 标签名称
			
		// 手写 createElement方法 创建虚拟 DOM 对象
 		export function createElement(ele,props,...children){
    		let virtualDom = {
        		$$typeof:Symbol('react.element'),
        		type:null,
        		props:{},
        		ref:null,
        		key:null,
    		}
    		let len = children.length
    		virtualDom.type = ele;
    		if(props !== null){
        		virtualDom.props = {
            		...props
        		};
    		}
    		if(len === 1) virtualDom.props.children = children[0]
    		if(len > 1) virtualDom.props.children = children;
    		return virtualDom
		}

2. 把构建的 virtualDOM 渲染为真实 DOM(真实DOM: 浏览器页面，最后渲染，用户看见的 DOM 元素)
	React16版本：
		React.render(
    		<>...</>,
        	documen.getElementById('root')
    	)
	React18版本：
		const root = ReactDOM.createRoot(document.getElementById('root'));
		root.render(
			<>...</>
		)
	
	// 手写 render 方法 把虚拟 DOM 转换成真实 DOM 16版本
	export function render(virtualDom,container){   
    	let { type ,props } = virtualDom;
    	if(typeof type === 'string'){
        	// 动态创建对应标签
        	let ele = document.createElement(type);
        	//  为标签设置属性和节点
        	each(props,(value,key)=>{
            	// clssName的处理
            	if(key === 'className'){
                	ele.className = value;
                	return; 
            	}
            	// 样式的处理
            	if(key === 'style'){
                	each(value,(val,attr)=>{
                    	ele.style[attr] = val;
                	})
                	return;
            	}
            	// 子节点处理
            	if(key === 'children'){
                	let children = value;
                	if(Array.isArray(children.length)) children = [children];
                	children.forEach(child=>{
                    	// 子节点是文本节点
                    	if(/^(string|number)$/.test(typeof child)){
                        	ele.appendChild(document.createTextNode(child))
                    	}
                    	// 子节点是虚拟 DOM 递归
                    	render(child,ele)
                	})
                	return;
            	}
            	ele.setAttribute(key,value)
        	})
        	// 把新增的标签，增加到指定容器中
        	container.appendChild(ele)
    	}
	}
	
补充说明: 第一次渲染页面是这直接从虚拟DOM转为真实DOM，但后期更新时，需要使用diff算法对比新旧DOM的差异部分，然后重新渲染差异部分
```

![](C:\Users\Admin\Desktop\2025_react\文档\JSX渲染.png)



##### 十二，封装简单对象迭代方法

```
	// 对象迭代方法 获取对象所有的 私有的，不论是否可枚举，不论类型
	// Object.getOwnPropertyNames() 获取对象非 Symbol 类型的私有属性(无关可枚举型)
	// Object.getOwnPropertySymbol() 获取 Symbol 类型的私有属性
	// 获取所有的私有属性：
	// let Keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbol(arr))
	// 或 let keys = Reflect.ownKeys(arr) 不兼容 IE
	export function each(obj,callback){
    	if(obj === null || typeof obj !== 'object') throw TypeError('obj is not a object');
    	if(typeof callback !== 'function') throw TypeError('callback is not a function');
    	let keys = Reflect.ownKeys(obj);
    	keys.forEach(key =>{
        	let value = obj[key];
        	// 每次迭代都把回调函数执行
        	callback(value,key)
    	})
	}
```

##### 十三，函数组件底层渲染机制

```
1. 基于 bael-peset-react-app 把调用的组件转换成 createElement 格式
2. 再把 createElement 方法执行，创建虚拟 DOM
	React.createElement(DemoOne,{
  		title:"demo",
  		x:10,
  		className:"demo",
  		style:{
    		fontSize: "20px"
  		}
	})
	转换成虚拟 DOM 对象
	{
		$$typeof:Symbol(react.element),
        key:null,
        ref:null,
        props:{ title: "demo",
          x: 10,
          className: "demo",
          style: {
            fontSize: "20px"
          }},
        type:DemoOne
	}
3. 通过 render 方法把虚拟 DOM 变成真实 DOM
	@1 转换过程中会把函数执行
	@2 把虚拟 DOM 的 props 作为实参传递给函数
	@3 最后把函数执行的返回结果基于 render 方法转为真实 DOM
```

##### 十四，函数组件 props 属性相关细节处理

```
只读，不可修改
	对象本身可设置规则：冻结，密封，不可扩展
	冻结：
		Object.freeze(obj): 无法修改，无法新增，无法删除以及无法做劫持，冻结只是浅冻结，无法做到深度冻结，需要递归
		Object.isFrozen(obj): 检查是否被冻结
		
	密封：
		Obect.seal(obj): 可法新增，无法删除以及无法做劫持，密封只是浅密封，无法做到深度密封，需要递归
		Obect.isSealed(obj): 检查是否被密封
		
	不可拓展：
		Object.preventExtensions(obj): 可修改，可删除，可劫持，无法新增，也是浅不可拓展
		Object.isExtensible(obj): 检查是否不可拓展
		

设置 props 属性规则：
	下载插件 prop-types
	import PropTypes from 'prop-types';

	函数组件.propTypes = {
		// 类型：字符串，必传
    	key: PropTypes.string.isRequired,
    	// 类型：数字，不必传
    	key: PropTypes.number
	}
```

##### 十五，函数组件的插槽机制

```
使用 props.children

默认插槽
	子组件：
		function Son(props) {
  			return (
    			<>
      				{props.children}
    			</>
  			)
		}
		export default Son
	父组件：
		import Son from "./Son";
		function Father() {
  			return (
    			<>
      				<Son>
        				<div>123</div>
      				</Son>
      				<Son>
        				<div>123</div>
        				<div>456</div>
      				</Son>
    			</>
  			)
		}
		export default Father

对 props.children 判断拆改使用：
	使用 React.Children 内置方法转为数组
	import React from 'react'
	function Son(props) {
    // 使用 React.Children 内置方法转为数组
   	let children =  React.Children.toArray(props.children);
  		return (
    		<>
      			{props.children}
      			<div>
        			{children[0]}
        			<br/>
        			{children[1]}
        			<br/>
      			</div>
    		</>
  		)
	}
	export default Son
	
具名插槽：
	子组件：
		import React from 'react'
		function Son(props) {
    		let children = React.Children.toArray(props.children);
    		let header = [];
    		let footer = [];
    		let defaults = [];
    		children.forEach(i=>{
        		if(i.props.slot === 'header'){
            		header.push(i)
        		}else if(i.props.slot === 'footer'){
            		footer.push(i)
        		}else{
            		defaults.push(i)
        		}
    		})
    		return (
        		<>
            		<div>
                		{header}
                		{footer}
                		{defaults}
            		</div>
        		</>
    		)
		}
		export default Son
	父组件：
		import Son from "./Son";
		function Father() {
  			return (
    			<>
      				<Son>
        				<div slot='footer'>页脚</div>
        				<span>哈哈</span>
        				<div slot='header'>页眉</div>
      				</Son>
    			</>
  			)
		}
		export default Father
```

##### 十六，静态组件和动态组件

```
函数组件是“静态组件”：
	第一次渲染组件，把函数执行
	产生一个私有的上下文
	把解析出来的props(含children)传递进来(但是被冻结了)
	对函数返回的 JSX 元素虚拟 DOM 进行渲染
	但我们去修改数据的时候
	修改上级上下文的变量
	私有变量会发生改变
	但是视图不会更新
	
类组件和 HooKs 组件是“动态组件”
```

##### 十七，浅比较和深比较

```
浅比较：
	const isObject = (obj) => {
    	return obj !== null &&  /^(object|function)$/.test(typeof obj)
	}
	const shallowEqual = (A,B)=>{
    	if(!isObject(A) && !isObject(B)) return A === B;
    	if(A === B) return true;
    	// 先比较成员的数量
    	let keysA = Reflect.ownKeys(A);
    	let keysB = Reflect.ownKeys(B);
    	if(keysA.length !== keysB.length) return false;

    	for(let i = 0; i< keysA.length; i++){
        	let key = keysA[i];
        	// 属性不在两个对象中 或者 属性名相同，属性值不同
        	if(!B.hasOwnProperty(key) || A[key] !== B[key]) return false
    	}
    	// 都相同返回true
    	return true
	}

深比较：
	const deepEqual = (A, B) => {
    	// NaN 对比情况判断为相同
    	if (Number.isNaN(A) && Number.isNaN(B)) return true;
    	// 是否为对象
    	if (!isObject(A) && !isObject(B)) return A === B;
    	if (A === B) return true;
    	// 先比较成员的数量
    	let keysA = Reflect.ownKeys(A);
    	let keysB = Reflect.ownKeys(B);
    	if (keysA.length !== keysB.length) return false;

    	for (let i = 0; i < keysA.length; i++) {
        	let key = keysA[i];
        	// 属性不在两个对象中 或者 属性名相同，属性值不同
        	if (!B.hasOwnProperty(key)) return false
        	// 递归比较
        	if (B.hasOwnProperty(key)) {
            	const equal = deepEqual(A[key], B[key])
            	if(!equal) return equal
        	}
    	}
    	// 都相同返回true
    	return true
	}
```











 







