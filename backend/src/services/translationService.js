import { generateText } from './openaiService.js'

import { buildTranslationPrompt } from '../prompts/translationPrompt.js'

export async function translatePrompt(prompt, sourceLanguage) {
  const targetLanguage = sourceLanguage === 'pl' ? 'English' : 'Polish'

  return generateText({
    prompt,

    systemPrompt: buildTranslationPrompt(targetLanguage),
  })
}
