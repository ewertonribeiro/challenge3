import { clear } from './utils/functions/clear'

const tbody = document.querySelector('tbody')

//Evento de click dos Botoes de remover e editar
document.addEventListener('click', async (e) => {
  if (e.target.id === 'btn-remover') {
    await showModalUser(e.target.value, 'delete')
  } else if (e.target.id === 'btn-editar') {
    await showModalUser(e.target.value, 'editar')
  }
})

//Mostrar Modal com os Dados Corretos
async function showModalUser(id, operation) {
  const name = document.getElementById(id).innerText
  const modalTitle = document.getElementById('modalTitle')
  const modalBtn = document.getElementById('closeModal')

  switch (operation) {
    case 'delete':
      modalTitle.innerText = `Tem Certeza que quer deletar o usuario ${name}?`
      modalBtn.value = id
      modalBtn.removeEventListener('click', editUser)
      modalBtn.addEventListener('click', deleteUser)
      break
    case 'editar':
      modalTitle.innerText = `Tem Certeza que quer editar o usuario ${name}?`
      modalBtn.value = id
      modalBtn.removeEventListener('click', deleteUser)
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
  const trUser = document.getElementById(value).parentElement
  trUser.remove()

  await fetch(`/api/users/${value}`, {
    method: 'DELETE',
  })
}

async function getUserById(id) {
  const user = await (await fetch(`/api/users/${id}`)).json()

  //Pegar os dados e colocar em um form de edição
  //Submeter o formulario
  //Mostrar os novos dados na tela
}
