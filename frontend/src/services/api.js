const API_URL = 'http://localhost:3000/api'

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)

    throw new Error(error?.error ?? 'Request failed')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
