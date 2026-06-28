import { generateResponse } from '../services/openaiService.js'

export async function compare(req, res) {
  try {
    const { prompt } = req.body

    const answer = await generateResponse(prompt)

    res.json({
      success: true,
      prompt,
      answer,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
