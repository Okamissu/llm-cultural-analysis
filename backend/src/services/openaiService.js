import client from '../config/openai.js'
import { OPENAI_MODEL } from '../config/config.js'

export async function generateResponse(prompt, options = {}) {
  const response = await client.responses.create({
    model: options.model ?? OPENAI_MODEL,
    input: prompt,
    ...options,
  })

  return response.output_text
}
