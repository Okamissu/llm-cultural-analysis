import { OPENAI_MODEL } from '../config/config.js'

export function mapExperimentToPrisma({ result, settings }) {
  const { sourceLanguage, culturalPrompting, temperature } = settings

  const targetLanguage = sourceLanguage === 'pl' ? 'EN' : 'PL'

  return {
    sourceLanguage: sourceLanguage.toUpperCase(),
    targetLanguage,

    llmModel: OPENAI_MODEL,

    temperature,

    culturalPrompting,

    promptSimilarity: result.prompt.similarity,
    responseSimilarity: result.response.similarity,

    prompts: {
      create: [
        {
          language: sourceLanguage.toUpperCase(),
          promptType: 'ORIGINAL',
          content: result.prompt.original,
        },
        {
          language: targetLanguage,
          promptType: 'TRANSLATED',
          content: result.prompt.translated,
        },
      ],
    },

    responses: {
      create: [
        {
          language: sourceLanguage.toUpperCase(),
          content: result.response.original,
        },
        {
          language: targetLanguage,
          content: result.response.translated,
        },
      ],
    },

    evaluation: {
      create: {
        naturalnessOriginal: result.judge.scores.naturalness.original,
        naturalnessTranslated: result.judge.scores.naturalness.translated,

        precisionOriginal: result.judge.scores.precision.original,
        precisionTranslated: result.judge.scores.precision.translated,

        detailOriginal: result.judge.scores.detail.original,
        detailTranslated: result.judge.scores.detail.translated,

        culturalContextOriginal: result.judge.scores.culturalContext.original,
        culturalContextTranslated:
          result.judge.scores.culturalContext.translated,

        toneOriginal: result.judge.scores.tone.original,
        toneTranslated: result.judge.scores.tone.translated,

        summary: result.judge.summary,
        observations: result.judge.observations,
      },
    },
  }
}
