import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const HomePage = lazy(() => import('@/pages/home/ui/HomePage'))
const DetailPage = lazy(() => import('@/pages/detail/ui/DetailPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/detail/:lat/:lon',
    element: <DetailPage />,
  },
])
