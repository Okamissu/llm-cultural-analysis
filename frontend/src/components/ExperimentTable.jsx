import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function truncate(text, max = 70) {
  if (!text) return ''

  return text.length > max ? `${text.slice(0, max)}...` : text
}

export default function ExperimentTable({ experiments }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  if (experiments.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold">{t('history.empty')}</h2>

        <p className="mt-2 text-slate-500">{t('history.emptyDescription')}</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-262.5">
          <thead className="bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-5 py-4">{t('history.date')}</th>

              <th className="w-full px-5 py-4">{t('history.prompt')}</th>

              <th className="px-5 py-4">{t('history.model')}</th>

              <th className="px-5 py-4">{t('history.direction')}</th>

              <th className="px-5 py-4 text-center">
                {t('history.temperature')}
              </th>

              <th className="px-5 py-4 text-center">{t('history.cultural')}</th>

              <th className="px-5 py-4 text-right">
                {t('history.promptSimilarity')}
              </th>

              <th className="px-5 py-4 text-right">
                {t('history.responseSimilarity')}
              </th>
            </tr>
          </thead>

          <tbody>
            {experiments.map((experiment) => (
              <tr
                key={experiment.id}
                onClick={() => navigate(`/history/${experiment.id}`)}
                className="cursor-pointer border-t transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-5 py-4 align-top">
                  <div className="font-medium">
                    {new Date(experiment.createdAt).toLocaleDateString(
                      i18n.language,
                    )}
                  </div>

                  <div className="text-xs text-slate-500">
                    {new Date(experiment.createdAt).toLocaleTimeString(
                      i18n.language,
                    )}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    #{experiment.id}
                  </div>
                </td>

                <td className="max-w-0 px-5 py-4">
                  <div
                    className="truncate font-medium"
                    title={experiment.prompts[0]?.content}
                  >
                    {truncate(experiment.prompts[0]?.content)}
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs whitespace-nowrap">
                    {experiment.llmModel}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  {experiment.sourceLanguage.toUpperCase()} →{' '}
                  {experiment.targetLanguage.toUpperCase()}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-center">
                  {Number(experiment.temperature).toFixed(1)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-center">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      experiment.culturalPrompting
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {experiment.culturalPrompting
                      ? t('common.enabled')
                      : t('common.disabled')}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-sm">
                  {Number(experiment.promptSimilarity).toFixed(3)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right font-mono text-sm">
                  {Number(experiment.responseSimilarity).toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm italic text-slate-500">
        {t('history.detailsHint')}
      </p>
    </>
  )
}
