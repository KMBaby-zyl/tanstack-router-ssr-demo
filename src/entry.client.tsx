import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { router } from './router'

// 等待路由器准备好
async function init() {
  // 初始化路由器
  await router.load()
  
  // 在客户端，我们使用 hydrateRoot 来"水合"服务器渲染的 HTML
  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

init() 