import { compare, hash } from "bcrypt"

export default class Password {

  private newPassString(): string {
    let pass = '';
    while (pass.length < 6) {
      const randomNumber = Math.floor(Math.random() * 9)
      pass += randomNumber;
    }
    return pass;
  }

  public async encrypt(pass: string): Promise<string> {

    const passHash = await hash(pass, 8);

    return passHash;
  }

  public async compare(hash: string, pass: string): Promise<boolean> {
    try {
      return await compare(pass, hash);
    } catch (error) {
      throw new Error(error)
    }
  }
  public async new(): Promise<string> {
    const pass = this.newPassString();

    return await this.encrypt(pass);
  }
}
