import { useTranslation } from 'react-i18next'

const criteria = [
  'naturalness',
  'precision',
  'detail',
  'culturalContext',
  'tone',
]

function getColor(score) {
  if (score >= 9) return 'bg-emerald-400'
  if (score >= 8) return 'bg-emerald-300'
  if (score >= 7) return 'bg-lime-300 text-slate-900'
  if (score >= 6) return 'bg-yellow-300 text-slate-900'
  return 'bg-red-300 text-white'
}

function getDifferenceColor(diff) {
  if (diff >= 2) return 'bg-emerald-400'
  if (diff >= 1) return 'bg-emerald-300'
  if (diff >= 0.5) return 'bg-lime-300 text-slate-900'

  if (diff > -0.5) return 'bg-slate-200 text-slate-700'

  if (diff > -1) return 'bg-orange-300 text-slate-900'
  if (diff > -2) return 'bg-red-300'

  return 'bg-red-500 text-white'
}

export default function JudgeHeatmap({ statistics }) {
  const { t } = useTranslation()

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold">{t('statistics.heatmap')}</h2>

        <p className="text-slate-500">{t('statistics.heatmapDescription')}</p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">
                {t('statistics.criterion')}
              </th>

              <th className="px-6 py-4 text-center">{t('languages.polish')}</th>

              <th className="px-6 py-4 text-center">
                {t('languages.english')}
              </th>

              <th className="px-6 py-4 text-center">
                {t('statistics.difference')}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {criteria.map((criterion) => {
              const pl = statistics.judge.pl[criterion]
              const en = statistics.judge.en[criterion]
              const diff = statistics.difference[criterion]

              return (
                <tr
                  key={criterion}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    {t(`judge.criteria.${criterion}`)}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <div
                      className={`inline-flex min-w-24 justify-center rounded-xl px-4 py-2 font-semibold ${getColor(
                        pl,
                      )}`}
                    >
                      {pl.toFixed(2)}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <div
                      className={`inline-flex min-w-24 justify-center rounded-xl px-4 py-2 font-semibold ${getColor(
                        en,
                      )}`}
                    >
                      {en.toFixed(2)}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <div
                      className={`inline-flex min-w-24 justify-center rounded-xl px-4 py-2 font-semibold ${getDifferenceColor(
                        diff,
                      )}`}
                    >
                      {diff > 0 ? '+' : ''}
                      {diff.toFixed(2)}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
