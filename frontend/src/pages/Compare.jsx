import { useState } from 'react'

import { comparePrompts } from '../services/api'

import SimilarityChart from '../components/SimilarityChart'
import JudgeTable from '../components/JudgeTable'

export default function Compare() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!prompt.trim()) return

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
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">LLM Cultural Analysis Tool</h1>

        <p className="mt-2 text-gray-600">
          Compare multilingual GPT responses using embeddings, cosine similarity
          and LLM-as-a-Judge.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full rounded-lg border p-4"
          rows={5}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </form>

      {result && (
        <div className="space-y-8">
          {/* Prompt */}

          <section className="rounded-xl border p-6">
            <h2 className="mb-6 text-2xl font-bold">Prompt</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Original</h3>

                <div className="rounded-lg bg-gray-50 p-4 whitespace-pre-wrap">
                  {result.prompt.original}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Translated</h3>

                <div className="rounded-lg bg-gray-50 p-4 whitespace-pre-wrap">
                  {result.prompt.translated}
                </div>
              </div>
            </div>
          </section>

          {/* Responses */}

          <section className="rounded-xl border p-6">
            <h2 className="mb-6 text-2xl font-bold">Responses</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Original</h3>

                <div className="rounded-lg bg-gray-50 p-4 whitespace-pre-wrap max-h-[500px] overflow-auto">
                  {result.response.original}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Translated</h3>

                <div className="rounded-lg bg-gray-50 p-4 whitespace-pre-wrap max-h-[500px] overflow-auto">
                  {result.response.translated}
                </div>
              </div>
            </div>
          </section>

          {/* Analysis */}

          <section>
            <h2 className="mb-6 text-2xl font-bold">Analysis</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border p-6">
                <SimilarityChart
                  promptSimilarity={result.prompt.similarity}
                  responseSimilarity={result.response.similarity}
                />
              </div>

              <div className="rounded-xl border p-6">
                <JudgeTable judge={result.judge} />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
