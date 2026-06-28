import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const criterionNames = {
  naturalness: 'Naturalness',
  precision: 'Precision',
  detail: 'Level of Detail',
  culturalContext: 'Cultural Context',
  tone: 'Tone',
}

function ScoreChart({ score }) {
  const data = [
    {
      response: 'Original',
      score: score.original,
    },
    {
      response: 'Translated',
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

          <YAxis type="category" dataKey="response" width={80} />

          <Tooltip />

          <Bar dataKey="score" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function JudgeTable({ judge }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold">LLM-as-a-Judge</h3>

        <p className="mt-1 text-sm text-slate-500">
          Automatic comparison of generated responses.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {' '}
        {Object.entries(judge.scores).map(([key, score]) => (
          <div key={key} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold">{criterionNames[key] ?? key}</h4>

              <div className="text-sm text-slate-500">
                {score.original} / {score.translated}
              </div>
            </div>

            <ScoreChart score={score} />
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-slate-50 p-5">
        <h4 className="font-semibold">Summary</h4>

        <p className="mt-3 leading-7 text-slate-700">{judge.summary}</p>
      </div>

      <div className="rounded-xl border bg-slate-50 p-5">
        <h4 className="font-semibold">Observations</h4>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {judge.observations.map((obs, index) => (
            <li key={index}>{obs}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
