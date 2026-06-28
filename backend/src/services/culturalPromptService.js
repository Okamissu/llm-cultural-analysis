import { buildCulturalPrompt } from '../prompts/culturalPrompt.js'

export function getSystemPrompt({ culturalPrompting, language }) {
  if (!culturalPrompting) {
    return null
  }

  return buildCulturalPrompt(language)
}
