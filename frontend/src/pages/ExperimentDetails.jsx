import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getExperiment } from '../services/experimentApi'

import SimilarityChart from '../components/SimilarityChart'
import JudgeTable from '../components/JudgeTable'

export default function ExperimentDetails() {
  const { id } = useParams()
  const { t } = useTranslation()

  const [experiment, setExperiment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getExperiment(id)

        setExperiment(data)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) {
    return <div>{t('common.loading')}</div>
  }

  if (!experiment) {
    return <div>{t('common.notFound')}</div>
  }

  const originalPrompt = experiment.prompts.find(
    (p) => p.promptType === 'ORIGINAL',
  )

  const translatedPrompt = experiment.prompts.find(
    (p) => p.promptType === 'TRANSLATED',
  )

  const originalResponse = experiment.responses.find(
    (r) => r.language === experiment.sourceLanguage,
  )

  const translatedResponse = experiment.responses.find(
    (r) => r.language === experiment.targetLanguage,
  )

  const evaluation = experiment.evaluation

  const judge = {
    scores: {
      naturalness: {
        original: Number(evaluation.naturalnessOriginal),
        translated: Number(evaluation.naturalnessTranslated),
      },

      precision: {
        original: Number(evaluation.precisionOriginal),
        translated: Number(evaluation.precisionTranslated),
      },

      detail: {
        original: Number(evaluation.detailOriginal),
        translated: Number(evaluation.detailTranslated),
      },

      culturalContext: {
        original: Number(evaluation.culturalContextOriginal),
        translated: Number(evaluation.culturalContextTranslated),
      },

      tone: {
        original: Number(evaluation.toneOriginal),
        translated: Number(evaluation.toneTranslated),
      },
    },

    summary: evaluation.summary,
    observations: evaluation.observations,
  }

  const sourceLabel =
    experiment.sourceLanguage.toLowerCase() === 'pl'
      ? t('languages.polish')
      : t('languages.english')

  const targetLabel =
    experiment.targetLanguage.toLowerCase() === 'pl'
      ? t('languages.polish')
      : t('languages.english')

  return (
    <div className="space-y-8">
      <Link
        to="/history"
        className="inline-flex items-center text-sm text-slate-500 transition hover:text-slate-900"
      >
        ← {t('history.back')}
      </Link>

      <section className="rounded-2xl bg-white px-8 py-4 shadow-sm w-fit">
        <h1 className="text-2xl font-bold">
          {t('history.experiment')} #{experiment.id}
        </h1>

        <p className="mt-2 text-slate-500">
          {new Date(experiment.createdAt).toLocaleString()}
        </p>
      </section>

      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">{t('history.settings')}</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <div className="text-sm text-slate-500">{t('history.model')}</div>

            <div className="mt-1 font-mono">{experiment.llmModel}</div>
          </div>

          <div>
            <div className="text-sm text-slate-500">
              {t('history.direction')}
            </div>

            <div className="mt-1">
              {experiment.sourceLanguage} → {experiment.targetLanguage}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-500">
              {t('history.temperature')}
            </div>

            <div className="mt-1">
              {Number(experiment.temperature).toFixed(1)}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-500">
              {t('history.cultural')}
            </div>

            <div className="mt-1">
              {experiment.culturalPrompting
                ? t('common.enabled')
                : t('common.disabled')}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-500">
              {t('history.promptSimilarity')}
            </div>

            <div className="mt-1 font-mono">
              {Number(experiment.promptSimilarity).toFixed(3)}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-500">
              {t('history.responseSimilarity')}
            </div>

            <div className="mt-1 font-mono">
              {Number(experiment.responseSimilarity).toFixed(3)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            {t('prompt.title', { language: sourceLabel })}
          </h2>

          <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
            {originalPrompt.content}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            {t('prompt.title', { language: targetLabel })}
          </h2>

          <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
            {translatedPrompt.content}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            {t('response.title', { language: sourceLabel })}
          </h2>

          <div className="max-h-112.5 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-mono text-sm">
            {originalResponse.content}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            {t('response.title', { language: targetLabel })}
          </h2>

          <div className="max-h-112.5 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 font-mono text-sm">
            {translatedResponse.content}
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <SimilarityChart
          promptSimilarity={Number(experiment.promptSimilarity)}
          responseSimilarity={Number(experiment.responseSimilarity)}
        />
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <JudgeTable
          judge={judge}
          sourceLanguage={experiment.sourceLanguage.toLowerCase()}
        />
      </section>
    </div>
  )
}
