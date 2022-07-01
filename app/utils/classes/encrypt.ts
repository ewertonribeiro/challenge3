import { compare, hash } from "bcrypt"


export default class Encrypt {

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
}
