import { useTranslation } from 'react-i18next'

function SimilarityBar({ labelKey, value }) {
  const { t } = useTranslation()

  const percentage = value * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">{t(labelKey)}</span>

        <span className="font-mono text-sm font-semibold">
          {value.toFixed(3)}
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export default function SimilarityChart({
  promptSimilarity,
  responseSimilarity,
}) {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold">{t('similarity.title')}</h3>

        <p className="mt-1 text-sm text-slate-500">
          {t('similarity.description')}
        </p>
      </div>

      <SimilarityBar labelKey="similarity.prompt" value={promptSimilarity} />

      <SimilarityBar
        labelKey="similarity.response"
        value={responseSimilarity}
      />

      <div className="rounded-xl border bg-slate-50 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">
          {t('similarity.interpretation')}
        </h4>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>{t('similarity.scale.identical')}</li>

          <li>{t('similarity.scale.high')}</li>

          <li>{t('similarity.scale.moderate')}</li>

          <li>{t('similarity.scale.low')}</li>
        </ul>
      </div>
    </div>
  )
}
