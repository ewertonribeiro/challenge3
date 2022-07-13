
function clear(table , tbody){

    if(table === "users"){
        tbody.innerHTML = ` <tbody class="users-tbody" id="users-tbody"></tbody>`

    }else if(table === "importacoes"){

        tbody.innerHTML = `
        <tr class="row-names" id="row-names">
        <td>Data das Transações</td>
        <td>Data da Importação</td>
        </tr>
        `
    }
}

export {clear}