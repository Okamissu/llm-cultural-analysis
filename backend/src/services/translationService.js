import { generateText } from './openaiService.js'
import { TRANSLATION_PROMPT } from '../prompts/systemPrompts.js'

export async function translatePrompt(prompt, sourceLanguage) {
  const targetLanguage = sourceLanguage === 'pl' ? 'English' : 'Polish'

  return generateText(TRANSLATION_PROMPT(prompt, targetLanguage))
}
