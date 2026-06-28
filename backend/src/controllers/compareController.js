import { comparePrompts } from '../services/comparisonService.js'

export async function compare(req, res) {
  try {
    const result = await comparePrompts(req.body)

    res.json(result)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
