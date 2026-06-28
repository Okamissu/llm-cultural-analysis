import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import SimilarityChart from '../components/SimilarityChart'
import JudgeTable from '../components/JudgeTable'
import EmbeddingPlot from '../components/EmbeddingPlot'

import { comparePrompts } from '../services/api'

export default function Compare() {
  const { t, i18n } = useTranslation()

  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  // język wpisywanego promptu
  const [sourceLanguage, setSourceLanguage] = useState('pl')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!prompt.trim()) return

    setLoading(true)

    try {
      const response = await comparePrompts({
        prompt,
        sourceLanguage,
        uiLanguage: i18n.language,
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
          {t('compare.title')}
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          {t('compare.description')}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('compare.placeholder')}
            className="w-full rounded-xl border bg-slate-50 p-5 outline-none transition focus:border-slate-800"
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-slate-700"></span>

              <div className="inline-flex rounded-xl border bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setSourceLanguage('pl')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    sourceLanguage === 'pl'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {t('languages.polish')}
                </button>

                <button
                  type="button"
                  onClick={() => setSourceLanguage('en')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    sourceLanguage === 'en'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {t('languages.english')}
                </button>
              </div>

              <span className="text-sm text-slate-500">
                {sourceLanguage === 'pl'
                  ? `${t('languages.polish')} → ${t('languages.english')}`
                  : `${t('languages.english')} → ${t('languages.polish')}`}
              </span>
            </div>

            <button
              disabled={loading}
              className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? t('compare.analyzing') : t('compare.analyze')}
            </button>
          </div>
        </form>
      </section>

      {result && (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{t('prompt.original')}</h2>

              <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
                {result.prompt.original}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('prompt.translated')}
              </h2>

              <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
                {result.prompt.translated}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('response.original')}
              </h2>

              <div className="max-h-[450px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-mono text-sm">
                {result.response.original}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('response.translated')}
              </h2>

              <div className="max-h-[450px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-mono text-sm">
                {result.response.translated}
              </div>
            </div>
          </section>

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
      )}
    </div>
  )
}
