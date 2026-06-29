import AppError from '../errors/AppError.js'

export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.status).json({
      code: err.code,
    })
  }

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
  })
}
