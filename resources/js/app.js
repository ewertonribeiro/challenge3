import '../css/app.css'
import { updateUi } from './utils/classes'
import { clear } from './utils/functions'

var form = document.getElementById('upload-form')
var inputTransaction = document.querySelector('input')

const tbody = document.querySelector('tbody')
const { requestServer } = new updateUi(tbody)

form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()

  const response = await requestServer('post', '/api/upload', new FormData(this))

  inputTransaction.value = ''
  //Exibir a resposta em tela
  showMessage(response)
  clear('importacoes', tbody)
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
  const importacoes = await requestServer('get', '/api/importacoes')

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

show_importacoes()
