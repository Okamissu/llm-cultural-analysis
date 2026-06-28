import { useTranslation } from 'react-i18next'

export default function StatsCards({ statistics }) {
  const { t } = useTranslation()

  const cards = [
    {
      title: t('statistics.cards.experiments'),
      value: statistics.totalExperiments,
    },
    {
      title: t('statistics.cards.languages'),
      value: (
        <div className="space-y-1 text-sm">
          <div>
            <strong>PL → EN</strong>: {statistics.languages.PL_EN}
          </div>

          <div>
            <strong>EN → PL</strong>: {statistics.languages.EN_PL}
          </div>
        </div>
      ),
    },
    {
      title: t('statistics.cards.promptSimilarity'),
      value: statistics.similarity.promptAverage.toFixed(3),
    },
    {
      title: t('statistics.cards.responseSimilarity'),
      value: statistics.similarity.responseAverage.toFixed(3),
    },
    {
      title: t('statistics.cards.culturalPrompting'),
      value: (
        <div className="space-y-1 text-sm">
          <div>
            <strong>{t('common.enabled')}</strong>:{' '}
            {statistics.culturalPrompting.enabled}
          </div>

          <div>
            <strong>{t('common.disabled')}</strong>:{' '}
            {statistics.culturalPrompting.disabled}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div key={card.title} className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {card.title}
          </div>

          <div className="mt-4 text-3xl font-bold">
            {typeof card.value === 'string' || typeof card.value === 'number'
              ? card.value
              : card.value}
          </div>
        </div>
      ))}
    </div>
  )
}
