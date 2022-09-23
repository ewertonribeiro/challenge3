import Response from '../Data/Reponse'

export class MyError extends Response {
  constructor(message: string) {
    super(message, true)
  }
}

export class FileResponse extends Response {
  private size: number;
  private fileName?: string;


  constructor(message: string, size: number, fileName?: string) {
    super(message);
    this.size = size;
    this.fileName = fileName;
    Object.assign(this.data, this.fileName, this.size);
  }
}

export class UserResponse extends Response {
  constructor(message: string) {
    super(message);
  }
}
