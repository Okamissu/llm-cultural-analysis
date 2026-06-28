import { useTranslation } from 'react-i18next'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export default function JudgeComparisonChart({ statistics }) {
  const { t } = useTranslation()

  const data = [
    {
      criterion: t('judge.criteria.naturalness'),
      PL: statistics.judge.pl.naturalness,
      EN: statistics.judge.en.naturalness,
    },
    {
      criterion: t('judge.criteria.precision'),
      PL: statistics.judge.pl.precision,
      EN: statistics.judge.en.precision,
    },
    {
      criterion: t('judge.criteria.detail'),
      PL: statistics.judge.pl.detail,
      EN: statistics.judge.en.detail,
    },
    {
      criterion: t('judge.criteria.culturalContext'),
      PL: statistics.judge.pl.culturalContext,
      EN: statistics.judge.en.culturalContext,
    },
    {
      criterion: t('judge.criteria.tone'),
      PL: statistics.judge.pl.tone,
      EN: statistics.judge.en.tone,
    },
  ]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">
        {t('statistics.judgeComparison')}
      </h2>

      <p className="mb-6 text-slate-500">
        {t('statistics.judgeComparisonDescription')}
      </p>

      <div className="h-105">
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              left: 40,
              right: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" domain={[0, 10]} />

            <YAxis type="category" dataKey="criterion" width={120} />

            <Tooltip />

            <Legend />

            <Bar dataKey="PL" radius={[4, 4, 4, 4]} />

            <Bar dataKey="EN" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
