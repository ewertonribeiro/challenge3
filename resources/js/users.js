import { clear } from './utils/functions/clear'

const tbody = document.querySelector('tbody')

//Evento de click dos Botoes de remover e editar
document.addEventListener('click', async (e) => {
  if (e.target.id === 'btn-remover') {
    await showModalUser(e.target.value, 'd')
  } else if (e.target.id === 'btn-editar') {
    await showModalUser(e.target.value, 'e')
  }
})

//Mostrar Modal com os Dados Corretos
async function showModalUser(id, operation) {
  const name = document.getElementById(id).innerText
  const modalTitle = document.getElementById('modalTitle')
  const modalBtn = document.getElementById('closeModal')

  switch (operation) {
    case 'd':
      modalTitle.innerText = `Tem Certeza que quer deletar o usuario ${name}?`

      modalBtn.value = id
      modalBtn.addEventListener('click', deleteUser)
      break
    case 'e':
      modalTitle.innerText = `Tem Certeza que quer editar o usuario ${name}?`
      modalBtn.value = id
      modalBtn.addEventListener('click', editUser)
      break
    default:
      return
  }
}

//editar o usuario
async function editUser({ target: { value } } /*  id do usuario */) {
  console.log(value)
}
//Deletar o usuario
async function deleteUser({ target: { value } } /*  id do usuario */) {
  await fetch(`/api/users/${value}`, {
    method: 'DELETE',
  })
  const tbody = document.getElementById('users-tbody')
  clear('users', tbody)
  await getAllusers()
}

async function getUserById(id) {
  const user = await (await fetch(`/api/users/${id}`)).json()

  //Pegar os dados e colocar em um form de edição
  //Submeter o formulario
  //Mostrar os novos dados na tela
}
