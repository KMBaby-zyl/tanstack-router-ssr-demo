// src/entry-server.tsx
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createMemoryHistory } from '@tanstack/react-router'
import { StartServer } from '@tanstack/react-start/server'
import { createRouter } from './router'

export async function render(url: string) {
  const router = createRouter()

  const memoryHistory = createMemoryHistory({
    initialEntries: [url],
  })

  router.update({
    history: memoryHistory,
  })

  await router.load()

  const appHtml = ReactDOMServer.renderToString(<StartServer router={router} />)

  // 返回HTML和状态码，而不是直接操作response
  return { 
    html: appHtml,
    statusCode: router.hasNotFoundMatch() ? 404 : 200
  }
}