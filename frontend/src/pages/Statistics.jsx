import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getStatistics } from '../services/statisticsApi'

import useDocumentTitle from '../hooks/useDocumentTitle'
import StatsCards from '../components/StatsCards'

export default function Statistics() {
  const { t } = useTranslation()

  useDocumentTitle('pageTitles.statistics')

  const [statistics, setStatistics] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getStatistics()

        setStatistics(data)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <div>{t('common.loading')}</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{t('statistics.title')}</h1>

        <p className="mt-2 text-slate-600">{t('statistics.description')}</p>
      </div>

      <StatsCards statistics={statistics} />

      <pre className="overflow-auto rounded-xl bg-slate-900 p-6 text-sm text-slate-100">
        {JSON.stringify(statistics, null, 2)}
      </pre>
    </div>
  )
}
