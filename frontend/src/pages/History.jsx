import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ExperimentTable from '../components/ExperimentTable'
import Loader from '../components/Loader'

import { getExperiments } from '../services/experimentApi'
import { showApiError } from '../services/toast'

import useDocumentTitle from '../hooks/useDocumentTitle'

export default function History() {
  const { t } = useTranslation()

  useDocumentTitle('pageTitles.history')

  const [experiments, setExperiments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getExperiments()

        setExperiments(data)
      } catch (error) {
        setError(true)
        showApiError(error, t)
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

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{t('errors.loadHistory')}</h1>

        <p className="mt-3 text-slate-500">{t('errors.tryAgain')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {t('history.title')}
          </h1>

          <p className="mt-2 text-slate-600">{t('history.description')}</p>
        </div>

        <button
          onClick={exportJson}
          className="rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          {t('history.export')}
        </button>
      </div>

      {loading ? <Loader /> : <ExperimentTable experiments={experiments} />}
    </div>
  )
}
