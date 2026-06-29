const API_URL = 'http://localhost:3000/api'

export async function api(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw {
      code: 'NETWORK_ERROR',
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null)

    throw {
      code: error?.code ?? 'INTERNAL_SERVER_ERROR',
      status: response.status,
    }
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
