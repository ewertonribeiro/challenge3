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
//home
Route.get('/', async ({ view }) => view.render('home'))

//Users
Route.get('/signup', async ({ view }) => view.render('signup'))
Route.get('/users', async (http) => {
  const { default: UserController } = await import('App/Controllers/Http/UsersController')

  const controller = new UserController()

  return http.view.render('users', {
    users: await controller.index(http),
  })
})
Route.resource('/api/users', 'UsersController').apiOnly()

//Upload de Transação
Route.get('/upload', async (http) => {
  const { default: ImportacoesController } = await import(
    'App/Controllers/Http/ImportacoesController'
  )
  const controller = new ImportacoesController()
  const importacoes = await controller.index(http)

  return http.view.render('upload', {
    importacoes: importacoes.data,
  })
})
Route.post('/api/upload', 'FilesController.store')
Route.get('/api/importacoes', 'ImportacoesController.index')
