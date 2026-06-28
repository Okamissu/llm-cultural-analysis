import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000

export const OPENAI_KEY = process.env.OPENAI_API_KEY

export const DATABASE_URL = process.env.DATABASE_URL

export const OPENAI_MODEL = process.env.OPENAI_MODEL
export const OPENAI_EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL
