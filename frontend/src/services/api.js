const API_URL = 'http://localhost:3000'

export async function comparePrompt(prompt) {
  const response = await fetch(`${API_URL}/api/compare`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      prompt,
    }),
  })

  return response.json()
}
