/* 对ES6内置API做兼容处理 */
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode react 语法严格模式
  <React.StrictMode> 
    <div>React</div>
  </React.StrictMode>
);
