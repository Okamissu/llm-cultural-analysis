import { useState } from 'react'
import { comparePrompt } from '../services/api'

function Compare() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')

  async function handleCompare() {
    const result = await comparePrompt(prompt)

    setAnswer(result.answer)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">LLM Cultural Analysis Tool</h1>

      <textarea
        className="w-full border rounded p-4"
        rows="6"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleCompare}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Compare
      </button>

      <div className="border rounded p-4">{answer}</div>
    </div>
  )
}

export default Compare
