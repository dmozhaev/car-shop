import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
