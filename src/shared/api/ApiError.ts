export class ApiError extends Error {
  status: number

  constructor(status: number, message?: string) {
    super(message ?? `API 요청 실패: ${status}`)
    this.name = 'ApiError'
    this.status = status
  }

  get isNotFound() {
    return this.status === 404
  }

  get isRateLimit() {
    return this.status === 429
  }
}
