import OpenAI from 'openai'
import { OPENAI_KEY } from './config.js'

const client = new OpenAI({
  apiKey: OPENAI_KEY,
})

export default client
