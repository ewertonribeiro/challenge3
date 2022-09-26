import View from '@ioc:Adonis/Core/View'

View.global('routes', [
  {
    url: '/',
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
