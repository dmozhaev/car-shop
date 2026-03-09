import { getToken } from '../auth/authStorage'
import { type CarFormData } from '../schemas/carSchemas'
import { type LoginFormData, type RegisterFormData } from '../schemas/authSchemas'

const API_BASE = '/api'

export async function apiGet(url: string) {
  const token = getToken()

  const response = await fetch(`http://localhost:8000${API_BASE}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })

  const data = await response.json()

  if (!response.ok) throw data

  return data
}

export async function apiPost(url: string, body: unknown) {
  const token = getToken()

  const response = await fetch(`http://localhost:8000${API_BASE}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) throw data

  return data
}

export const registerSeller = (payload: RegisterFormData) => {
  return apiPost('/register/', payload)
}

export const loginSeller = (payload: LoginFormData) => {
  return apiPost('/login/', payload)
}

export const createCar = (payload: CarFormData) => {
  return apiPost('/cars/', payload)
}

export const getMakes = () => {
  return apiGet('/makes/')
}

export const getCars = () => {
  return apiGet('/carlist/')
}

export const getCar = (id: number) => {
  return apiGet(`/cars/${id}/`)
}

export const buyCar = (id: number, name: string) => {
  return apiPost(`/cars/${id}/buy/`, { name })
}
