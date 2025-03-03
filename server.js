import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // 创建 Vite 服务器
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // 使用 vite 的中间件
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // 1. 读取 index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      // 2. 应用 Vite HTML 转换
      template = await vite.transformIndexHtml(url, template)

      // 3. 加载服务器入口
      const { render } = await vite.ssrLoadModule('/src/entry.server.tsx')

      // 4. 渲染应用的 HTML，传递当前 URL
      const result = await render(url)

      // 5. 注入渲染后的应用 HTML 到模板中
      const html = template.replace(`<div id="root"></div>`, `<div id="root">${result.html}</div>`)

      // 6. 发送渲染后的 HTML
      res.status(result.statusCode).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了错误，让 Vite 修复堆栈跟踪
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000')
  })
}

createServer() 