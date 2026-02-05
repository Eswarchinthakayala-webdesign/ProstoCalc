import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/LandingPage'
import DocsPage from './pages/DocsPage'
import DemoPage from './pages/DemoPage'
import { ThemeProvider } from './components/theme-provider'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/docs",
        element: <DocsPage />,
      },
      {
        path: "/docs/:trackId/:moduleId/:lessonId",
        element: <DocsPage />,
      },
      {
        path: "/demo",
        element: <DemoPage />,
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App