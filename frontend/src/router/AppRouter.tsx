import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CreateCarPage from '../pages/CreateCarPage'
import HomePage from '../pages/HomePage'
import CarDetailPage from '../pages/CarDetailPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cars/create" element={<CreateCarPage />} />
      <Route path="/cars/:id" element={<CarDetailPage />} />
    </Routes>
  )
}
