import { generateStructured } from './openaiService.js'

import { judgeSchema } from '../schemas/judgeSchema.js'

import { JUDGE_PROMPT } from '../prompts/systemPrompts.js'

export async function evaluateResponses(result) {
  return generateStructured(
    JUDGE_PROMPT(
      result.prompt.original,

      result.prompt.translated,

      result.response.original,

      result.response.translated,
    ),

    judgeSchema,
  )
}
