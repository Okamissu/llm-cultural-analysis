import { createEmbedding } from './openaiService.js'

export async function generateEmbeddings(texts) {
  return Promise.all(texts.map((text) => createEmbedding(text)))
}
