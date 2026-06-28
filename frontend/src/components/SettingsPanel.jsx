import { useTranslation } from 'react-i18next'

export default function SettingsPanel({
  sourceLanguage,
  setSourceLanguage,

  culturalPrompting,
  setCulturalPrompting,

  temperature,
  setTemperature,

  loading,
}) {
  const { t } = useTranslation()

  return (
    <div className="rounded-xl border bg-slate-50 p-6">
      <h3 className="text-lg font-semibold">{t('settings.title')}</h3>

      <div className="mt-6 space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            {t('settings.promptLanguage')}
          </label>

          <div className="inline-flex rounded-xl border bg-white p-1">
            <button
              type="button"
              onClick={() => setSourceLanguage('pl')}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                sourceLanguage === 'pl'
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              {t('languages.polish')}
            </button>

            <button
              type="button"
              onClick={() => setSourceLanguage('en')}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                sourceLanguage === 'en'
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              {t('languages.english')}
            </button>
          </div>
        </div>

        <label
          htmlFor="cultural-prompting"
          className="flex  mb-3 cursor-pointer items-start justify-between gap-4 rounded-lg transition hover:bg-slate-100 p-2 -m-2"
        >
          <div>
            <p className="font-medium">{t('settings.culturalPrompting')}</p>

            <p className="mt-1 text-sm text-slate-500">
              {t('settings.culturalPromptingDescription')}
            </p>
          </div>

          <input
            id="cultural-prompting"
            type="checkbox"
            checked={culturalPrompting}
            onChange={(e) => setCulturalPrompting(e.target.checked)}
            className="mt-1 h-5 w-5 accent-slate-900"
          />
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">{t('settings.temperature')}</span>

            <span className="font-mono">{temperature.toFixed(1)}</span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-slate-900"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? t('compare.analyzing') : t('compare.analyze')}
        </button>
      </div>
    </div>
  )
}
