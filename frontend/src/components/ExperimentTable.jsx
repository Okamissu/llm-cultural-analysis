import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ExperimentTable({ experiments }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-600">
          <tr>
            <th className="px-5 py-4">ID</th>

            <th className="px-5 py-4">{t('history.date')}</th>

            <th className="px-5 py-4">{t('history.direction')}</th>

            <th className="px-5 py-4">{t('history.temperature')}</th>

            <th className="px-5 py-4">{t('history.cultural')}</th>

            <th className="px-5 py-4">{t('history.promptSimilarity')}</th>

            <th className="px-5 py-4">{t('history.responseSimilarity')}</th>
          </tr>
        </thead>

        <tbody>
          {experiments.map((experiment) => (
            <tr
              key={experiment.id}
              onClick={() => navigate(`/history/${experiment.id}`)}
              className="cursor-pointer border-t transition hover:bg-slate-50"
            >
              <td className="px-5 py-4 font-medium">{experiment.id}</td>

              <td className="px-5 py-4">
                {new Date(experiment.createdAt).toLocaleString()}
              </td>

              <td className="px-5 py-4">
                {experiment.sourceLanguage} → {experiment.targetLanguage}
              </td>

              <td className="px-5 py-4">
                {Number(experiment.temperature).toFixed(1)}
              </td>

              <td className="px-5 py-4">
                {experiment.culturalPrompting ? '✓' : '—'}
              </td>

              <td className="px-5 py-4 font-mono">
                {Number(experiment.promptSimilarity).toFixed(3)}
              </td>

              <td className="px-5 py-4 font-mono">
                {Number(experiment.responseSimilarity).toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
