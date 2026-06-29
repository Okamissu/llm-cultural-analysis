import { comparePrompts } from '../services/comparisonService.js'

export async function compare(req, res, next) {
  try {
    const result = await comparePrompts(req.body)

    res.json(result)
  } catch (error) {
    next(error)
  }
}
