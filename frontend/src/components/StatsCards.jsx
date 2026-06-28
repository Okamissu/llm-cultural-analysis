import { useTranslation } from 'react-i18next'

export default function StatsCards({ statistics }) {
  const { t } = useTranslation()

  const averageTemperature =
    statistics.temperatures.length > 0
      ? (
          statistics.temperatures.reduce((sum, value) => sum + value, 0) /
          statistics.temperatures.length
        ).toFixed(2)
      : '-'

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
    {
      title: t('statistics.cards.averageTemperature'),
      value: averageTemperature,
    },
  ]

  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white px-6 py-4 shadow-sm"
        >
          <div className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {card.title}
          </div>

          <div className="mt-4 text-xl font-bold">{card.value}</div>
        </div>
      ))}
    </div>
  )
}
