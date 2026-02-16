import { QueryProvider } from './providers/QueryProvider'

export default function App() {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold p-4">Weather App</h1>
      </div>
    </QueryProvider>
  )
}
