import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import "dayjs/locale/zh-cn";
import '@ant-design/v5-patch-for-react-19';
import store from './store';
import ancestorsContext from './ancestorsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN} >
    <ancestorsContext.Provider  value={store}>
    <App />
    </ancestorsContext.Provider>
  </ConfigProvider>,
);

/* 对ES6内置API做兼容处理 */
// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import '@/index.less';
// import { createElement,render } from './jsxHandle';
// import DemoOne from "@/views/DemoOne";
// import Father from './views/Father';
// import Dialog from './views/Dialog';
// import Vote from './views/Vote';
// import Class from './views/Class';
// import Event from './views/Event'


// const root = ReactDOM.createRoot(document.getElementById('root'));

// 密集数组
// const data = [
//   {
//     id:1,
//     title:'1111'
//   },
//   {
//     id:2,
//     title:'2222'
//   },
//   {
//     id:3,
//     title:'3333'
//   },
// ]

// let x = 10; 

// 稀疏数组 fill 填充 转密集数组
// const arr = new Array(5).fill(null);

// console.log(
//   React.createElement(
//   'div',
//   {
//     id: 'app',
//   },
//   "Hello,",
//   React.createElement("span",null,'world!')      
//   )
// )

// let jsxObj = createElement(
//   'div',
//   {
//     id: 'app',
//   },
//   "Hello,",
//   createElement("span",null,'world!'),
// )

// React.createElement(DemoOne,{
//   title:"demo",
//   x:10,
//   className:"demo",
//   style:{
//     fontSize:'20px'
//   }
// })

// let obj = {
//   a:1,
//   b:2,
// }

// root.render(
  // React.StrictMode react 语法严格模式
  // <React.StrictMode>
    // <div>
      {/* <h2>React</h2>
      <ul>
        {
          data.map((item)=>{
            return (
              // 循环创建的元素设置唯一值 key 
              <li key={item.id}>
                <em>{item.id}</em>
                &nbsp;&nbsp;
                <span>{item.title}</span>
              </li>
            )
          })
        }
      </ul>
      {
        arr.map((_,index)=>{
          return (
            <button key={index}>Button_{index + 1}</button>
          )
        })
      } */}


      {/* <>
        <div>React</div>
        <div>{x}</div>
      </>
      

      <div id="app">
        Hello, <span>world!</span>
      </div> */}

      {/* <DemoOne
        className='demo' 
        title="demoOne"
        x={10}
        style={{
            fontSize:'20px',
        }}
      ></DemoOne> */}

      {/* <Father></Father> */}

        {/* <Dialog 
          title="友情提示"
          content="学习React"
        >
          <button>确定</button>
          <button>很确定</button>
        </Dialog> */}

        {/* <Vote></Vote> */}
        {/* <Class></Class> */}
        {/* <Event></Event> */}
    // </div>
  // </React.StrictMode>
// );

// render(jsxObj,document.getElementById('root'))

// fetch('/jian/subscription/recommended_collections')
//   .then(response => {
//     console.log(response)
//   })
  
// fetch('/zhi/news/latest')
// .then(response => {
//   console.log(response)
// })