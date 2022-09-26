import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Password from 'App/utils/classes/Password'
import { MyError, UserResponse } from '../../utils/classes/Responses/MyResponses'

export default class UsersController {
  private model = User
  private passFunction = new Password()

  public async index({ response }: HttpContextContract) {
    //Filtra o Usuario Admin e os usuarios ativos
    const users = await this.model.all()
    const filteredUsers = users
      .filter((user) => user.name !== 'Admin')
      .filter((user) => !user.ativo)
    response.status(200)
    return filteredUsers
  }

  public async store({ request }: HttpContextContract) {
    const { email, name } = request.body() as { email: string; name: string }

    if (!email || !name) {
      return new MyError('Nome e email são Obrigatórios!')
    }

    if (await this.model.findBy('email', email)) {
      return new MyError('Email ja cadastrado na Base de Dados!')
    }

    const senha = this.passFunction.newPassString()

    await this.model.create({ name, email, senha })
    return new UserResponse(`Usuario cadastrado.Sua senha e : ${senha}`)
  }

  public async destroy({ response, request }: HttpContextContract) {
    const id = request.param('id') as string

    //Verificar se e do admin e nao remover
    if (Number(id) === 1) {
      return response.status(400).json(new MyError('Nao e possivel excluir este usuario!'))
    }
    //Verificar se o usuario existe
    const user = await this.model.findBy('id', id)
    if (!user) {
      return response.status(404).json(new MyError(`Usuário com o id: ${id} nao encontrado!`))
    }
    //Verificar se e o id do usuario logado e nao remover

    //Apagar o usuario => torna-lo inativo
    user.ativo = true
    await user.save()
    //retornar a resposta
    return response.json(new UserResponse(`Usuario com o id: ${id} deletado`))
  }
}
