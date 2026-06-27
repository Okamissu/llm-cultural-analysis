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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">LLM Cultural Analysis Tool</h1>

      <textarea
        rows={8}
        className="w-full border rounded-lg p-4"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleCompare}
        className="px-6 py-3 rounded bg-blue-600 text-white"
      >
        Compare
      </button>

      <div className="border rounded-lg p-4 min-h-32">{answer}</div>
    </div>
  )
}

export default Compare
