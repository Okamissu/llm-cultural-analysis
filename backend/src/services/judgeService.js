import { generateStructured } from './openaiService.js'

import { judgeSchema } from '../schemas/judgeSchema.js'

import { buildJudgePrompt } from '../prompts/judgePrompt.js'

export async function evaluateResponses({
  result,
  uiLanguage,
  sourceLanguage,
}) {
  const sourceName = sourceLanguage === 'pl' ? 'Polish' : 'English'

  const targetName = sourceLanguage === 'pl' ? 'English' : 'Polish'

  const prompt = `
Source language:

${sourceName}

Translated language:

${targetName}

Response in source language:

${result.response.original}

Response in translated language:

${result.response.translated}
`

  return generateStructured({
    prompt,

    systemPrompt: buildJudgePrompt({
      uiLanguage,
      sourceLanguage,
    }),

    schema: judgeSchema,
  })
}
