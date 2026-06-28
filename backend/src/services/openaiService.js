import client from '../config/openai.js'
import { OPENAI_MODEL, OPENAI_EMBEDDING_MODEL } from '../config/config.js'

export async function generateText(prompt, options = {}) {
  const response = await client.responses.create({
    model: options.model ?? OPENAI_MODEL,
    input: prompt,
    ...options,
  })

  return response.output_text
}

export async function createEmbedding(text) {
  const response = await client.embeddings.create({
    model: OPENAI_EMBEDDING_MODEL,
    input: text,
  })

  return response.data[0].embedding
}
