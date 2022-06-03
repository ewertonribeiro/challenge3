import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  private model = User

  async index({ response }: HttpContextContract) {
    response.status(200)
    return await this.model.all()

  }
}
