import client from '../config/openai.js'
import { OPENAI_MODEL, OPENAI_EMBEDDING_MODEL } from '../config/config.js'

export async function generateText({
  prompt,
  systemPrompt = null,
  temperature = 0.7,
  model = OPENAI_MODEL,
}) {
  const input = systemPrompt
    ? [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ]
    : prompt

  const response = await client.responses.create({
    model,
    input,
    temperature,
  })

  return response.output_text
}

export async function generateStructured({
  prompt,
  systemPrompt = null,
  schema,
}) {
  const input = systemPrompt
    ? [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ]
    : prompt

  const response = await client.responses.create({
    model: OPENAI_MODEL,

    input,

    text: {
      format: {
        type: 'json_schema',
        name: schema.name,
        schema: schema.schema,
      },
    },
  })

  return JSON.parse(response.output_text)
}

export async function createEmbedding(text) {
  const response = await client.embeddings.create({
    model: OPENAI_EMBEDDING_MODEL,
    input: text,
  })

  return response.data[0].embedding
}
