export default class Response {
  protected data: {
    error: boolean
    message: string
  }
  constructor(message: string, error = false,data?:any) {
    this.data = {
      error:error,
      message:message,
      ...(data && {...data})
    }
  }
}
