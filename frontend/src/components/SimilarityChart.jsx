function SimilarityBar({ label, value }) {
  const percentage = value * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>

        <span className="font-mono text-sm font-semibold">
          {value.toFixed(3)}
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export default function SimilarityChart({
  promptSimilarity,
  responseSimilarity,
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold">Semantic Similarity</h3>

        <p className="mt-1 text-sm text-slate-500">
          Cosine similarity between embedding vectors. Values closer to 1
          indicate greater semantic similarity.
        </p>
      </div>

      <SimilarityBar label="Prompt" value={promptSimilarity} />

      <SimilarityBar label="Response" value={responseSimilarity} />

      <div className="rounded-xl border bg-slate-50 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">
          Interpretation
        </h4>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>
            <strong>1.0</strong> — nearly identical semantic representations
          </li>

          <li>
            <strong>0.8–0.99</strong> — highly similar
          </li>

          <li>
            <strong>0.5–0.8</strong> — moderately similar
          </li>

          <li>
            <strong>&lt; 0.5</strong> — substantially different
          </li>
        </ul>
      </div>
    </div>
  )
}
