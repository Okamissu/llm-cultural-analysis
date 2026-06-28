import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts'

export default function EmbeddingPlot({ data }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Embedding Projection (PCA)</h3>

        <p className="mt-1 text-sm text-slate-500">
          Two-dimensional projection of prompt and response embeddings.
        </p>
      </div>

      <div className="h-72 rounded-lg bg-slate-50 p-4">
        <ResponsiveContainer>
          <ScatterChart
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" dataKey="x" name="PCA 1" />

            <YAxis type="number" dataKey="y" name="PCA 2" />

            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value) => Number(value).toFixed(3)}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.label ?? ''
              }
            />

            <Scatter data={data}>
              <LabelList dataKey="label" position="top" fontSize={12} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
        {data.map((point) => (
          <div key={point.label} className="rounded bg-slate-100 px-3 py-2">
            <strong>{point.label}</strong>

            <div>
              ({point.x.toFixed(2)}, {point.y.toFixed(2)})
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
