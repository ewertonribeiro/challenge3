import Data from '../Data/Data'

export class MyError extends Data {
  constructor(message: string) {
    super(message, true)
  }
}

export class FileResponse extends Data {
  private size:number;
  private fileName?:string;


  constructor(message:string , size:number,fileName?:string){
    super(message);
    this.size = size;
    this.fileName = fileName;

    Object.assign(this.data , this.fileName , this.size);
  }
}

export class UserResponse extends Data {

  constructor(message:string){
    super(message);
  }
}
