export default class ExceptionHandler extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super()
  }
}