import { generateText } from './openaiService.js'
import { translatePrompt } from './translationService.js'
import { generateEmbeddings } from './embeddingService.js'
import { evaluateResponses } from './judgeService.js'
import { cosineSimilarity } from '../utils/cosineSimilarity.js'
import { reduceEmbeddings } from '../utils/pca.js'

export async function comparePrompts({
  prompt,
  sourceLanguage = 'pl',
  temperature = 0.7,
}) {
  // Translation
  const translatedPrompt = await translatePrompt(prompt, sourceLanguage)

  // Responses
  const [originalResponse, translatedResponse] = await Promise.all([
    generateText(prompt, {
      temperature,
    }),
    generateText(translatedPrompt, {
      temperature,
    }),
  ])

  // Prompt embeddings
  const [promptEmbedding, translatedPromptEmbedding] = await generateEmbeddings(
    [prompt, translatedPrompt],
  )

  // Response embeddings
  const [originalResponseEmbedding, translatedResponseEmbedding] =
    await generateEmbeddings([originalResponse, translatedResponse])

  const result = {
    prompt: {
      original: prompt,
      translated: translatedPrompt,

      similarity: cosineSimilarity(promptEmbedding, translatedPromptEmbedding),
    },

    response: {
      original: originalResponse,
      translated: translatedResponse,

      similarity: cosineSimilarity(
        originalResponseEmbedding,
        translatedResponseEmbedding,
      ),
    },
  }

  const embeddingVisualization = reduceEmbeddings(
    [
      promptEmbedding,
      translatedPromptEmbedding,
      originalResponseEmbedding,
      translatedResponseEmbedding,
    ],
    ['Prompt (PL)', 'Prompt (EN)', 'Response (PL)', 'Response (EN)'],
  )

  const judge = await evaluateResponses(result)

  return {
    ...result,
    visualization: embeddingVisualization,
    judge,
  }
}
