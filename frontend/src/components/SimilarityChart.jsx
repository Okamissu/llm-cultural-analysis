import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts'

export default function SimilarityChart({
  promptSimilarity,
  responseSimilarity,
}) {
  const data = [
    {
      name: 'Prompt',
      similarity: Number(promptSimilarity.toFixed(3)),
    },
    {
      name: 'Response',
      similarity: Number(responseSimilarity.toFixed(3)),
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Semantic Similarity</h2>

      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis domain={[0, 1]} />

            <Tooltip />

            <Bar dataKey="similarity" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="similarity" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
