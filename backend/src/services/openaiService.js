import client from '../config/openai.js'
import { OPENAI_MODEL, OPENAI_EMBEDDING_MODEL } from '../config/config.js'
import AppError from '../errors/AppError.js'

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

  try {
    const response = await client.responses.create({
      model,
      input,
      temperature,
      max_output_tokens: 500,
    })

    return response.output_text
  } catch (error) {
    handleOpenAIError(error)
  }
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

  try {
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
  } catch (error) {
    handleOpenAIError(error)
  }
}

export async function createEmbedding(text) {
  try {
    const response = await client.embeddings.create({
      model: OPENAI_EMBEDDING_MODEL,
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    handleOpenAIError(error)
  }
}

function handleOpenAIError(error) {
  const status = error.status ?? error.statusCode

  switch (status) {
    case 401:
      throw new AppError('OPENAI_INVALID_API_KEY', 500)

    case 429:
      throw new AppError('OPENAI_QUOTA_EXCEEDED', 429)

    case 408:
      throw new AppError('OPENAI_TIMEOUT', 504)

    default:
      throw new AppError('OPENAI_API_ERROR', 502)
  }
}
