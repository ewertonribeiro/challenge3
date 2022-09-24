
function clear(table , tbody){

    if(table === "users"){
        tbody.innerHTML = ` <tbody class="users-tbody" id="users-tbody"></tbody>`

    }else if(table === "importacoes"){

        tbody.innerHTML = `
        <tbody class="mt-5" id="tbody">
        <tr
          class="
            container
            d-flex
            justify-content-between
            fs-2
            fw-bold
            mb-1
            border-bottom
            border-secondary
            pb-4
            mb-4
          "
          id="row-names"
        >
        <td>Data das Transações</td>
        <td>Data da Importação</td>
        </tr>
        </tbody>
        `
    }
}

export {clear}
