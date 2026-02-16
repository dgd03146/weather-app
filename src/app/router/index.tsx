import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/home/ui/HomePage'
import DetailPage from '@/pages/detail/ui/DetailPage'
import { RouteErrorFallback } from '@/shared/ui'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '/detail/:lat/:lon',
    element: <DetailPage />,
    errorElement: <RouteErrorFallback />,
  },
])
