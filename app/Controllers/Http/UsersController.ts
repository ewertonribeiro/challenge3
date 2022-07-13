import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Encrypt from 'App/utils/classes/encrypt'
import generateRandomPass from 'App/utils/functions/generatePassword'
import { MyError, UserResponse } from '../../utils/classes/Responses/MyResponses'

export default class UsersController {
  private model = User
  private passFunction = new Encrypt()

  async index({ response }: HttpContextContract) {
    response.status(200)
    return await this.model.all()
  }

  async store({ request }: HttpContextContract) {
    const { email, name } = request.body()

    if (!email || !name) {
      return new MyError('Nome e email são Obrigatórios!')
    }

    if (await this.model.findBy('email', email)) {
      return new MyError('Email ja cadastrado na Base de Dados!')
    }

    const senha = generateRandomPass()
    const passHash = await this.passFunction.encrypt(senha)

    await this.model.create({ name, email, senha: passHash })
    return new UserResponse('Usuario cadastrado com sucesso!')
  }
}
