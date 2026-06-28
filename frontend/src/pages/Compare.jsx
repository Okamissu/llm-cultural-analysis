import { useState } from 'react'

import SimilarityChart from '../components/SimilarityChart'
import JudgeTable from '../components/JudgeTable'
import EmbeddingPlot from '../components/EmbeddingPlot'

import { comparePrompts } from '../services/api'

export default function Compare() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!prompt.trim()) return

    setLoading(true)

    try {
      const response = await comparePrompts({
        prompt,
        sourceLanguage: 'pl',
      })

      setResult(response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight">
          Compare multilingual LLM responses
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Evaluate semantic similarity, embedding projections and cultural
          differences between GPT responses.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full rounded-xl border bg-slate-50 p-5 outline-none transition focus:border-slate-800"
          />

          <button
            disabled={loading}
            className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
      </section>

      {result && (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Original Prompt</h2>

              <div className="rounded-lg bg-slate-50 p-4 whitespace-pre-wrap">
                {result.prompt.original}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Translated Prompt</h2>

              <div className="rounded-lg bg-slate-50 p-4 whitespace-pre-wrap">
                {result.prompt.translated}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Original Response</h2>

              <div className="max-h-112.5 overflow-auto rounded-lg bg-slate-50 p-4 font-mono text-sm whitespace-pre-wrap">
                {result.response.original}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Translated Response</h2>

              <div className="max-h-112.5 overflow-auto rounded-lg bg-slate-50 p-4 font-mono text-sm whitespace-pre-wrap">
                {result.response.translated}
              </div>
            </div>
          </section>

          <>
            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <SimilarityChart
                  promptSimilarity={result.prompt.similarity}
                  responseSimilarity={result.response.similarity}
                />
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <EmbeddingPlot data={result.visualization} />
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <JudgeTable judge={result.judge} />
            </section>
          </>
        </>
      )}
    </div>
  )
}
