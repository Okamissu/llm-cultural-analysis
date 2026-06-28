export async function comparePrompts(data) {
  const response = await fetch('http://localhost:3000/api/compare', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })

  return response.json()
}
