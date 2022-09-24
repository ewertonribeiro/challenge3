// import {clear} from "./utils/functions"
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
            <td>${name}</td>
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

// function clear() {
//   let tbody = document.querySelector('tbody')

//   tbody.innerHTML = ` <tbody class="users-tbody" id="users-tbody"></tbody>
// `
// }
