import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import generateRandomPass from 'App/utils/functions/generatePassword'


export default class UsersController {

  private model = User

  async index({ response }: HttpContextContract) {
    response.status(200)
    return await this.model.all()

  }


  async store({ request }: HttpContextContract) {

    const { email, name } = request.body()

    if (!email || !name) {
      return {
        data: {
          mensagem: "Nome e email são Obrigatórios!"
        },
        erro: true
      }
    }

    const senha = generateRandomPass();

    const user = await User.create({ name, email, senha })
    return user
  }
}
