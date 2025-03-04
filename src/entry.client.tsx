import React from 'react'
import ReactDOM from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'
import { createRouter } from './router'
// import { router } from './router'

// 等待路由器准备好
async function init() {
  const router = createRouter()

  // 初始化路由器
  // await router.load()
  console.log('window.__TSR__', window.__TSR__);
  if (window.__TSR__) {
    ReactDOM.hydrateRoot(document, <StartClient router={router} />);
  } else {
    ReactDOM.createRoot(document.getElementById('root')!).render(<StartClient router={router} />);
  }
}

init() 