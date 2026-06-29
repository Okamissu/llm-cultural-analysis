import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ExperimentTable from '../components/ExperimentTable'

import { getExperiments } from '../services/experimentApi'
import { showError } from '../services/toast'

import useDocumentTitle from '../hooks/useDocumentTitle'

export default function History() {
  const { t } = useTranslation()

  useDocumentTitle('pageTitles.history')

  const [experiments, setExperiments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getExperiments()

        setExperiments(data)
      } catch {
        showError(t('common.requestFailed'))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [t])

  function exportJson() {
    const blob = new Blob([JSON.stringify(experiments, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url
    link.download = 'experiments.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold">{t('history.title')}</h1>

          <p className="mt-2 text-slate-600">{t('history.description')}</p>
        </div>

        <button
          onClick={exportJson}
          className="rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          {t('history.export')}
        </button>
      </div>

      {loading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <ExperimentTable experiments={experiments} />
      )}
    </div>
  )
}
