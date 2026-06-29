export default class AppError extends Error {
  constructor(code, status = 500) {
    super(code)

    this.code = code
    this.status = status
  }
}
