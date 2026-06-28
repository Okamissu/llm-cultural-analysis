import { generateText } from './openaiService.js'
import { translatePrompt } from './translationService.js'

export async function comparePrompts({
  prompt,
  sourceLanguage = 'pl',
  temperature = 0.7,
}) {
  const translatedPrompt = await translatePrompt(prompt, sourceLanguage)

  const originalResponse = await generateText(prompt, {
    temperature,
  })

  const translatedResponse = await generateText(translatedPrompt, {
    temperature,
  })

  return {
    prompt,

    sourceLanguage,

    translatedPrompt,

    responses: {
      original: originalResponse,
      translated: translatedResponse,
    },
  }
}
