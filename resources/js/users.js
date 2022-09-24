import { clear } from './utils/functions/clear'
import { updateUi } from './utils/classes/updateUi'

const tbody = document.querySelector('tbody')
const { requestServer } = new updateUi(tbody)

async function getAllusers() {
  const users = await requestServer('get', '/api/users')

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

document.addEventListener('click', async (e) => {
  if (e.target.id === 'btn-remover') {
    await showModalUser(e.target.value)
  }
})

async function showModalUser(id) {
  const name = document.getElementById(id).innerText
  const modalTitle = document.getElementById('modalTitle')
  const modalBtn = document.getElementById('closeModal')
  modalTitle.innerText = `Tem Certeza que quer deletar o usuario ${name}?`

  modalBtn.value = id
  modalBtn.addEventListener('click', deleteUser)
}

async function deleteUser({ target: { value } }) {
  await fetch(`/api/users/${value}`, {
    method: 'DELETE',
  })
  const tbody = document.getElementById('users-tbody')
  clear('users', tbody)
  await getAllusers()
}
