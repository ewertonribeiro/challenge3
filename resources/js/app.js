import '../css/app.css'
import Message from './utils/classes/showMessage';
import { updateUi } from './utils/classes/updateUi'
import { clear } from './utils/functions/clear'

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
  const message = new Message(response);
  message.showMessage();

  clear('importacoes', tbody)
  show_importacoes()
}

async function show_importacoes() {
  const importacoes = await requestServer('get', '/api/importacoes')

  //Adiciona Os valores na ui
  importacoes.forEach(({ data: { dataTransacao, dataImportacao } }) => {
    const tr = document.createElement('tr')
    tr.className = 'd-flex justify-content-between py-1 px-2 fs-4 fw-normal'

    const tdTransacao = document.createElement('td')
    const tdImportacao = document.createElement('td')

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
