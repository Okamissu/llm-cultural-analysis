export function createComparisonResult(data) {
  return {
    prompt: {
      original: data.prompt,
      translated: data.translatedPrompt,
      similarity: data.promptSimilarity,
    },

    response: {
      original: data.originalResponse,
      translated: data.translatedResponse,
      similarity: data.responseSimilarity,
    },
  }
}
