import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Password from 'App/utils/classes/Password'
import { MyError, UserResponse } from '../../utils/classes/Responses/MyResponses'

export default class UsersController {
  private model = User
  private passFunction = new Password()

  async index({ response }: HttpContextContract) {
    response.status(200)

    //Filtra o Usuario Admin
    const filteredUsers = await this.model.all()
    return filteredUsers.filter(user=>user.name !== 'Admin')
  }

  async store({ request }: HttpContextContract) {
    const { email, name } = request.body() as { email: string, name: string }

    if (!email || !name) {
      return new MyError('Nome e email são Obrigatórios!')
    }

    if (await this.model.findBy('email', email)) {
      return new MyError('Email ja cadastrado na Base de Dados!')
    }

    const senha = this.passFunction.newPassString();

    await this.model.create({ name, email, senha })
    return new UserResponse(`Usuario cadastrado.Sua senha e : ${senha}`)
  }

  async destroy({response,request}:HttpContextContract) {
    const id = request.param('id') as string

    //Verificar se o usuario existe
    //Verificar se e do admin e nao remover
    //Verificar se e o id do usuario logado e nao remover

    //Apagar o usuario => torna-lo inativo

    //retornar a resposta
    return response.json({id})
  }
}
