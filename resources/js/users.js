// import {clear} from "./utils/functions"
import { updateUi } from './utils/classes'

const tbody = document.querySelector('tbody')
const { requestServer } = new updateUi(tbody)

async function getAllusers() {
  const users = await requestServer('get', '/api/users')

  users.forEach(({ id, email, name }) => {
    let tr = document.createElement('tr')

    tr.classList.add('users-tr')
    tr.id = 'users-tr'

    tr.innerHTML = `
    <tr class="users-tr" id="users-tr">
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>
              <div class="users-table-btns">
                <button type="button" class="btn-editar" id="btn-editar">Editar</button>
                <button type="button" class="btn-remover" id="btn-remover">Remover</button>
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
