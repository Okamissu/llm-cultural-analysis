export default function JudgeTable({ judge }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">LLM-as-a-Judge</h2>

      <table className="w-full border-collapse overflow-hidden rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Criterion</th>

            <th className="border p-3">Original</th>

            <th className="border p-3">Translated</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(judge.scores).map(([criterion, score]) => (
            <tr key={criterion}>
              <td className="border p-3 capitalize">{criterion}</td>

              <td className="border p-3 text-center">{score.original}</td>

              <td className="border p-3 text-center">{score.translated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3 className="font-semibold">Summary</h3>

        <p className="mt-2">{judge.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold">Observations</h3>

        <ul className="mt-2 list-disc space-y-2 pl-6">
          {judge.observations.map((obs, index) => (
            <li key={index}>{obs}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
