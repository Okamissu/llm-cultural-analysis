import { useState } from 'react'
import { comparePrompts } from '../services/api'

export default function Compare() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    try {
      const data = await comparePrompts({
        prompt,
        sourceLanguage: 'pl',
      })

      setResult(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">LLM Cultural Analysis</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-3"
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="bg-black text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </form>

      {result && (
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold">Prompt</h2>

            <p>
              <strong>Original:</strong>
            </p>

            <p>{result.prompt.original}</p>

            <p className="mt-4">
              <strong>Translated:</strong>
            </p>

            <p>{result.prompt.translated}</p>

            <p className="mt-4">
              Similarity: {result.prompt.similarity.toFixed(4)}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Responses</h2>

            <p>
              <strong>Original:</strong>
            </p>

            <p>{result.response.original}</p>

            <p className="mt-4">
              <strong>Translated:</strong>
            </p>

            <p>{result.response.translated}</p>

            <p className="mt-4">
              Similarity: {result.response.similarity.toFixed(4)}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">LLM-as-a-Judge</h2>

            <table className="border-collapse border w-full">
              <thead>
                <tr>
                  <th className="border p-2">Criterion</th>

                  <th className="border p-2">Original</th>

                  <th className="border p-2">Translated</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(result.judge.scores).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border p-2">{key}</td>

                    <td className="border p-2">{value.original}</td>

                    <td className="border p-2">{value.translated}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <h3 className="font-semibold">Summary</h3>

              <p>{result.judge.summary}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Observations</h3>

              <ul className="list-disc ml-6">
                {result.judge.observations.map((obs, index) => (
                  <li key={index}>{obs}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
