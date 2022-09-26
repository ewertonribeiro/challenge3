import View from '@ioc:Adonis/Core/View'

View.global('routes', [
  {
    url: '/upload',
    text: 'Importações',
  },
  {
    url: '/users',
    text: 'Usuários',
  },
  {
    url: '/signup',
    text: 'Cadastrar Usuario',
  },
])
