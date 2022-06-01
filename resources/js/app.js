import '../css/app.css'

var form = document.querySelector('form')
var inputTransaction = document.querySelector('input')

form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/upload', {
    method: 'post',
    body: new FormData(this),
  })

  inputTransaction.value = ''
  //Exibir a resposta em tela
  showMessage(await response.json())
  clear()
  show_importacoes()
}

function showMessage({ data }) {
  // let messages = ['danger','erro',success]

  var divMessage = document.getElementById('message')
  var span = document.getElementById('message-span')

  data.erro
    ? divMessage.classList.add('message-danger')
    : divMessage.classList.add('message-success')

  divMessage.classList.remove('hidden')
  span.textContent = data.mensagem

  setTimeout(() => {
    console.log('setTimeout')
    divMessage.classList.remove('message-danger')
    divMessage.classList.remove('message-success')
    divMessage.classList.add('hidden')
  }, 3000)
}

async function show_importacoes() {
  const response = await fetch('/api/importacoes')
  const importacoes = await response.json()

  const tbody = document.querySelector('tbody')

  //Adiciona Os valores na ui
  importacoes.forEach(({ data: { dataTransacao, dataImportacao } }) => {
    let tr = document.createElement('tr')
    tr.classList.add('tr-values')

    let tdTransacao = document.createElement('td')
    let tdImportacao = document.createElement('td')

    tdTransacao.innerText = dataTransacao
    tdImportacao.innerText = formatDate(dataImportacao)

    tr.appendChild(tdTransacao)
    tr.appendChild(tdImportacao)

    tbody.appendChild(tr)
  })
}

function formatDate(date) {
  const dataImportacao = new Date(date)

  //Formata a data
  const data = `${dataImportacao.getUTCDate()}/${
    dataImportacao.getMonth() + 1
  }/${dataImportacao.getFullYear()} - ${dataImportacao.getHours()}:${dataImportacao.getMinutes()}:${dataImportacao.getSeconds()}`

  return data
}

function clear() {
  const tbody = document.querySelector('tbody')

  tbody.innerHTML = `
  <tr class="row-names" id="row-names">
  <td>Data das Transações</td>
  <td>Data da Importação</td>
  </tr>
  `
}

show_importacoes()
