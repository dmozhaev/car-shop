import { Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

function LoginPage() {
  return <div>Login page coming soon</div>
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
