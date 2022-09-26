/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

//Home
Route.get('/', async (http) => {
  await http.auth.use('web').authenticate()
  const { default: ImportacoesController } = await import(
    'App/Controllers/Http/ImportacoesController'
  )
  const controller = new ImportacoesController()
  const importacoes = await controller.index(http)

  return http.view.render('upload', {
    importacoes: importacoes.data,
  })
})

//Users
Route.get('/signup', async ({ view, auth }) => {
  await auth.use('web').authenticate()
  return view.render('signup')
})

Route.get('/users', async (http) => {
  await http.auth.use('web').authenticate()
  const { default: UserController } = await import('App/Controllers/Http/UsersController')

  const controller = new UserController()

  return http.view.render('users', {
    users: await controller.index(http),
  })
})
Route.resource('/api/users', 'UsersController').apiOnly()

Route.post('/api/upload', 'FilesController.store')
Route.get('/api/importacoes', 'ImportacoesController.index')

//Rotas de login Auth
Route.post('/api/login', async ({ request, auth, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  //Tratar caso o usuario nao exista
  const user = await User.query().where('email', email).firstOrFail()

  if (!(await Hash.verify(user.senha, password))) {
    //Retornar a Resposta Padronizada
    return response.badRequest('Invalid credentials')
  }

  await auth.use('web').login(user)
  response.redirect('/upload')
})
Route.get('/login', async ({ view }) => view.render('login'))
