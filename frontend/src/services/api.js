const API_URL = 'http://localhost:3000/api'

export async function comparePrompts(data) {
  const response = await fetch(`${API_URL}/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}
