const API_BASE = '/api'

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(`http://localhost:8000${API_BASE}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}

export const registerSeller = (payload: {
  email: string
  password: string
  password_repeat: string
}) => {
  return apiPost('/register/', payload)
}
