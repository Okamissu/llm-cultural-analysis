import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Card({ title, experiment }) {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl mt-2 bg-white px-6 py-4 shadow-sm">
      <div className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {title}
      </div>

      <div className="mt-4 text-2xl font-bold font-mono">
        {experiment.value.toFixed(3)}
      </div>

      <Link
        to={`/history/${experiment.id}`}
        className="mt-6 inline-flex items-center rounded-lg border border-slate-500 px-4 py-2 text-sm text-slate-500 transition hover:bg-slate-100"
      >
        {t('statistics.openExperiment')}

        <span className="ml-1 text-xs text-slate-500">(#{experiment.id})</span>
      </Link>
    </div>
  )
}

export default function BestWorstCards({ statistics }) {
  const { t } = useTranslation()

  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">{t('statistics.bestWorst')}</h2>

        <p className="text-slate-500">{t('statistics.bestWorstDescription')}</p>
      </div>

      <div className="grid gap-6  grid-cols-2 md:grid-cols-4 ">
        <Card
          title={t('statistics.bestPrompt')}
          experiment={statistics.bestPromptSimilarity}
        />

        <Card
          title={t('statistics.worstPrompt')}
          experiment={statistics.worstPromptSimilarity}
        />

        <Card
          title={t('statistics.bestResponse')}
          experiment={statistics.bestResponseSimilarity}
        />

        <Card
          title={t('statistics.worstResponse')}
          experiment={statistics.worstResponseSimilarity}
        />
      </div>
    </section>
  )
}
