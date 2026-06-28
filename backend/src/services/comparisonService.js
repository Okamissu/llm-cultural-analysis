import { generateText } from './openaiService.js'
import { translatePrompt } from './translationService.js'
import { generateEmbeddings } from './embeddingService.js'
import { evaluateResponses } from './judgeService.js'
import { getSystemPrompt } from './culturalPromptService.js'

import { cosineSimilarity } from '../utils/cosineSimilarity.js'
import { reduceEmbeddings } from '../utils/pca.js'

export async function comparePrompts({
  prompt,
  sourceLanguage = 'pl',
  uiLanguage = 'en',
  culturalPrompting = false,
  temperature = 0.7,
}) {
  // Translation
  const translatedPrompt = await translatePrompt(prompt, sourceLanguage)

  // System prompts (optional)
  const originalSystemPrompt = getSystemPrompt({
    culturalPrompting,
    language: sourceLanguage,
  })

  const translatedSystemPrompt = getSystemPrompt({
    culturalPrompting,
    language: sourceLanguage === 'pl' ? 'en' : 'pl',
  })

  // Responses
  const [originalResponse, translatedResponse] = await Promise.all([
    generateText({
      prompt,
      systemPrompt: originalSystemPrompt,
      temperature,
    }),

    generateText({
      prompt: translatedPrompt,
      systemPrompt: translatedSystemPrompt,
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

  // PCA visualization
  const visualization = reduceEmbeddings(
    [
      promptEmbedding,
      translatedPromptEmbedding,
      originalResponseEmbedding,
      translatedResponseEmbedding,
    ],
    [
      `Prompt (${sourceLanguage.toUpperCase()})`,
      `Prompt (${sourceLanguage === 'pl' ? 'EN' : 'PL'})`,
      `Response (${sourceLanguage.toUpperCase()})`,
      `Response (${sourceLanguage === 'pl' ? 'EN' : 'PL'})`,
    ],
  )

  // LLM-as-a-Judge
  const judge = await evaluateResponses({
    result,
    uiLanguage,
  })

  return {
    ...result,
    visualization,
    judge,

    settings: {
      sourceLanguage,
      uiLanguage,
      culturalPrompting,
      temperature,
    },
  }
}
