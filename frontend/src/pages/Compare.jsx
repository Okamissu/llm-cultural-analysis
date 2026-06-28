import { useState } from 'react'
import { comparePrompts } from '../services/api'

function Compare() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const data = await comparePrompts({
      prompt,
      sourceLanguage: 'pl',
      temperature: 0.7,
    })

    setResult(data)

    setLoading(false)
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">LLM Cultural Analysis</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-4"
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
          Compare
        </button>
      </form>

      {loading && <p className="mt-6">Loading...</p>}

      {result && (
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="font-bold">Original prompt</h2>

            <p>{result.prompt}</p>
          </div>

          <div>
            <h2 className="font-bold">Translated prompt</h2>

            <p>{result.translatedPrompt}</p>
          </div>

          <div>
            <h2 className="font-bold">Original response</h2>

            <p>{result.responses.original}</p>
          </div>

          <div>
            <h2 className="font-bold">Translated response</h2>

            <p>{result.responses.translated}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Compare
