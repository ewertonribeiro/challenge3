export default class Data {
  protected data: {
    error: boolean
    message: string
  }
  constructor(message: string, error = false) {
    this.data = {
      error:error,
      message:message
    }
  }
}
