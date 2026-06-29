import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getStatistics } from '../services/statisticsApi'
import { showApiError } from '../services/toast'

import useDocumentTitle from '../hooks/useDocumentTitle'

import StatsCards from '../components/StatsCards'
import JudgeComparisonChart from '../components/JudgeComparisonChart'
import BestWorstCards from '../components/BestWorstCards'
import JudgeHeatmap from '../components/JudgeHeatmap'
import Loader from '../components/Loader'

export default function Statistics() {
  const { t } = useTranslation()

  useDocumentTitle('pageTitles.statistics')

  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getStatistics()

        setStatistics(data)
      } catch (error) {
        setError(true)
        showApiError(error, t)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [t])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{t('errors.loadHistory')}</h1>

        <p className="mt-3 text-slate-500">{t('errors.tryAgain')}</p>
      </div>
    )
  }

  if (statistics.totalExperiments === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{t('statistics.empty')}</h1>

        <p className="mt-3 text-slate-500">
          {t('statistics.emptyDescription')}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          {t('statistics.title')}
        </h1>

        <p className="mt-2 text-slate-600">{t('statistics.description')}</p>
      </div>

      <StatsCards statistics={statistics} />

      <BestWorstCards statistics={statistics} />

      <JudgeComparisonChart statistics={statistics} />

      <JudgeHeatmap statistics={statistics} />
    </div>
  )
}
