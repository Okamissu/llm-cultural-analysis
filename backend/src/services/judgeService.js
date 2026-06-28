import { generateStructured } from './openaiService.js'

import { judgeSchema } from '../schemas/judgeSchema.js'

import { buildJudgePrompt } from '../prompts/judgePrompt.js'

export async function evaluateResponses({ result, uiLanguage }) {
  const prompt = `
Original prompt:

${result.prompt.original}

Translated prompt:

${result.prompt.translated}

Original response:

${result.response.original}

Translated response:

${result.response.translated}
`

  return generateStructured({
    prompt,

    systemPrompt: buildJudgePrompt(uiLanguage),

    schema: judgeSchema,
  })
}
