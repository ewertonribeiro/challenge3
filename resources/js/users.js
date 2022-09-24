import { clear } from './utils/functions/clear'

const tbody = document.querySelector('tbody')

async function getAllusers() {
  const users = await (await fetch('/api/users')).json()

  users.forEach(({ id, email, name }) => {
    let tr = document.createElement('tr')

    tr.className = ''
    tr.id = 'users-tr'

    tr.innerHTML = `
    <tr  id="users-tr">
            <td>${id}</td>
            <td id=${id}>${name}</td>
            <td>${email}</td>
            <td>
              <div class="users-table-btns">
                <button
                  type="button"
                  class="btn btn-info btn-sm"
                  id="btn-editar"
                  value=${id}
                  data-bs-toggle="modal"
                  data-bs-target="#modalUser"
                  >
                  <i class="fa-solid fa-user-pen"></i>
                  Editar
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  id="btn-remover"
                  data-bs-toggle="modal"
                  data-bs-target="#modalUser"
                  value=${id}
                  >
                  <i class="fa-solid fa-trash"></i>
                  Remover
                </button>
              </div>
            </td>
          </tr>
      `

    tbody.append(tr)
  })
}

getAllusers()

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
    default:
      break
  }
}

//editar o usuario
async function editUser({ target: { value } }/*  id do usuario */) {
  console.log(value)
}
//Deletar o usuario
async function deleteUser({ target: { value } }/*  id do usuario */) {
  await fetch(`/api/users/${value}`, {
    method: 'DELETE',
  })
  const tbody = document.getElementById('users-tbody')
  clear('users', tbody)
  await getAllusers()
}
