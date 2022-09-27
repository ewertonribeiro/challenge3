import Response from '../Data/Reponse'

export class MyError extends Response {
  constructor(message: string) {
    super(message, true)
  }
}

export class FileResponse extends Response {
  constructor(message: string, size: number, fileName?: string) {
    super(message, false, { size, fileName })
  }
}

export class UserResponse extends Response {
  constructor(message: string) {
    super(message)
  }
}

type User = {
  name: string
  email: string
  id: number
}

export class LoginResponse extends Response {
  constructor(message: string, user: User) {
    super(message, false, { user })
  }
}
