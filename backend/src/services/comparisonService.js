import { generateText } from './openaiService.js'
import { translatePrompt } from './translationService.js'
import { generateEmbeddings } from './embeddingService.js'
import { evaluateResponses } from './judgeService.js'
import { getSystemPrompt } from './culturalPromptService.js'

import { cosineSimilarity } from '../utils/cosineSimilarity.js'
import { reduceEmbeddings } from '../utils/pca.js'
import { getVisualizationLabels } from '../utils/localization.js'

import ExperimentRepository from '../repositories/experimentRepository.js'
import { mapExperimentToPrisma } from '../mappers/experimentMapper.js'

export async function comparePrompts({
  prompt,
  sourceLanguage = 'pl',
  uiLanguage = 'en',
  culturalPrompting = false,
  temperature = 0.7,
}) {
  const translatedPrompt = await translatePrompt(prompt, sourceLanguage)

  const originalSystemPrompt = getSystemPrompt({
    culturalPrompting,
    language: sourceLanguage,
  })

  const translatedSystemPrompt = getSystemPrompt({
    culturalPrompting,
    language: sourceLanguage === 'pl' ? 'en' : 'pl',
  })

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

  const [promptEmbedding, translatedPromptEmbedding] = await generateEmbeddings(
    [prompt, translatedPrompt],
  )

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

  const visualization = reduceEmbeddings(
    [
      promptEmbedding,
      translatedPromptEmbedding,
      originalResponseEmbedding,
      translatedResponseEmbedding,
    ],
    getVisualizationLabels(sourceLanguage, uiLanguage),
  )

  const judge = await evaluateResponses({
    result,
    uiLanguage,
    sourceLanguage,
  })

  const settings = {
    sourceLanguage,
    uiLanguage,
    culturalPrompting,
    temperature,
  }

  await ExperimentRepository.save(
    mapExperimentToPrisma({
      result: {
        ...result,
        judge,
      },
      settings,
    }),
  )

  return {
    ...result,
    visualization,
    judge,
    settings,
  }
}
