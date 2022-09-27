import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import { LoginResponse, MyError, UserResponse } from 'App/utils/classes/Responses/MyResponses'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    //Tratar caso o usuario nao exista
    const user = await User.query().where('email', email).first()

    if (!user) {
      return response.status(400).json(new MyError('Email ou senha inválido!'))
    }

    if (user.name === 'Admin') {
      if (user.senha !== password) {
        return response.status(400).json(new MyError('Email ou senha inválido!'))
      }

      await auth.use('web').login(user)

      return response.status(201).json(
        new LoginResponse('Usuario Logado com Sucesso!', {
          id: user.id,
          name: user.name,
          email: user.email,
        })
      )
    }

    if (user.deleted) {
      return response.status(400).json(new MyError('Usuario Deletado do Banco!'))
    }

    if (!(await Hash.verify(user.senha, password))) {
      return response.status(400).json(new MyError('Email ou senha inválido!'))
    }

    if (!user.ativo) {
      user.ativo = true
      await user.save()
    }

    // const rememberMe = true
    await auth.use('web').login(user)

    return response.status(201).json(
      new LoginResponse('Usuario Logado com Sucesso!', {
        id: user.id,
        name: user.name,
        email: user.email,
      })
    )
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    return response.json(new UserResponse('Usuario Deslogado!'))
  }
}
