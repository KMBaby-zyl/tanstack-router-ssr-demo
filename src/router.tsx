import React from 'react'
import { 
  createRootRoute, 
  createRoute, 
  createRouter as createTanStackRouter,
  RouterProvider
} from '@tanstack/react-router'

// 根布局组件
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <nav>
          <a href="/">首页</a> | <a href="/about">关于</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>© 2023 React SSR Demo</footer>
    </div>
  )
}

// 页面组件
const HomePage = () => {
  return (
    <div>
      <h1>首页</h1>
      <p>欢迎来到 React SSR 演示项目</p>
    </div>
  )
}

const AboutPage = () => {
  return (
    <div>
      <h1>关于页面</h1>
      <p>这是一个使用 Vite 和 TanStack Router 构建的 React SSR 演示项目</p>
    </div>
  )
}

// 创建路由
const rootRoute = createRootRoute({
  component: ({ children }) => <RootLayout>{children}</RootLayout>
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage
})

// 注册路由
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

// 创建路由器函数
export function createRouter() {
  return createTanStackRouter({ routeTree })
}

// 创建默认路由器实例
export const router = createRouter()

// 路由提供者组件
export function Router() {
  return <RouterProvider router={router} />
}

// 声明路由类型
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
} 