import { useTranslation } from 'react-i18next'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

function ScoreChart({ score, sourceLanguage }) {
  const { t } = useTranslation()

  const sourceLabel =
    sourceLanguage === 'pl' ? t('languages.polish') : t('languages.english')

  const targetLabel =
    sourceLanguage === 'pl' ? t('languages.english') : t('languages.polish')

  const data = [
    {
      response: sourceLabel,
      score: score.original,
    },
    {
      response: targetLabel,
      score: score.translated,
    },
  ]

  return (
    <div className="h-28">
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 15,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" domain={[0, 10]} />

          <YAxis type="category" dataKey="response" width={90} />

          <Bar dataKey="score" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function JudgeTable({ judge, sourceLanguage }) {
  const { t } = useTranslation()

  const sourceLabel =
    sourceLanguage === 'pl' ? t('languages.polish') : t('languages.english')

  const targetLabel =
    sourceLanguage === 'pl' ? t('languages.english') : t('languages.polish')

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold">{t('judge.title')}</h3>

        <p className="mt-1 text-sm text-slate-500">{t('judge.description')}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(judge.scores).map(([key, score]) => (
          <div key={key} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3">
              <h4 className="font-semibold">{t(`judge.criteria.${key}`)}</h4>

              <div className="mt-1 flex justify-between text-sm text-slate-500">
                <span>
                  {sourceLabel}: <strong>{score.original}</strong>
                </span>

                <span>
                  {targetLabel}: <strong>{score.translated}</strong>
                </span>
              </div>
            </div>

            <ScoreChart score={score} sourceLanguage={sourceLanguage} />
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-slate-50 p-5">
        <h4 className="font-semibold">{t('judge.summary')}</h4>

        <p className="mt-3 leading-7 text-slate-700">{judge.summary}</p>
      </div>

      <div className="rounded-xl border bg-slate-50 p-5">
        <h4 className="font-semibold">{t('judge.observations')}</h4>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {judge.observations.map((obs, index) => (
            <li key={index}>{obs}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
