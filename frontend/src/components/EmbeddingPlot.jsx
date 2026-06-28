import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function EmbeddingPlot({ data }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Embedding Visualization (PCA)</h2>

      <div className="h-96">
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid />

            <XAxis type="number" dataKey="x" />

            <YAxis type="number" dataKey="y" />

            <Tooltip
              formatter={(value, name, props) => [value, props.payload.label]}
            />

            <Scatter data={data} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
