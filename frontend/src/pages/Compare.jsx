import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import SimilarityChart from '../components/SimilarityChart'
import JudgeTable from '../components/JudgeTable'
import EmbeddingPlot from '../components/EmbeddingPlot'
import SettingsPanel from '../components/SettingsPanel'

import { comparePrompts } from '../services/compareApi'
import { showSuccess, showApiError } from '../services/toast'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Compare() {
  const { t, i18n } = useTranslation()

  const location = useLocation()
  const repeat = location.state?.repeat

  const [prompt, setPrompt] = useState(repeat?.prompt ?? '')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const [sourceLanguage, setSourceLanguage] = useState(
    repeat?.sourceLanguage ?? 'pl',
  )

  const [culturalPrompting, setCulturalPrompting] = useState(
    repeat?.culturalPrompting ?? false,
  )

  const [temperature, setTemperature] = useState(repeat?.temperature ?? 0.7)

  useDocumentTitle('pageTitles.compare')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!prompt.trim()) return

    setLoading(true)

    try {
      const response = await comparePrompts({
        prompt,
        sourceLanguage,
        uiLanguage: i18n.language,
        culturalPrompting,
        temperature,
      })

      setResult(response)

      showSuccess(t('compare.finished'))
    } catch (error) {
      showApiError(error, t)
    } finally {
      setLoading(false)
    }
  }

  const analysisLanguage = result?.settings?.sourceLanguage ?? sourceLanguage

  const sourceLabel =
    analysisLanguage === 'pl' ? t('languages.polish') : t('languages.english')

  const targetLabel =
    analysisLanguage === 'pl' ? t('languages.english') : t('languages.polish')

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight">
          {t('compare.title')}
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          {t('compare.description')}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]"
        >
          <textarea
            rows={12}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('compare.placeholder')}
            className="w-full resize-none rounded-xl border bg-slate-50 p-5 outline-none transition focus:border-slate-800"
          />

          <SettingsPanel
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            culturalPrompting={culturalPrompting}
            setCulturalPrompting={setCulturalPrompting}
            temperature={temperature}
            setTemperature={setTemperature}
            loading={loading}
          />
        </form>
      </section>

      {result && (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('prompt.title', { language: sourceLabel })}
              </h2>

              <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
                {result.prompt.original}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('prompt.title', { language: targetLabel })}
              </h2>

              <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
                {result.prompt.translated}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('response.title', { language: sourceLabel })}
              </h2>

              <div className="max-h-112.5 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-mono text-sm">
                {result.response.original}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {t('response.title', { language: targetLabel })}
              </h2>

              <div className="max-h-112.5 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-mono text-sm">
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
            <JudgeTable
              judge={result.judge}
              sourceLanguage={analysisLanguage}
            />
          </section>
        </>
      )}
    </div>
  )
}
