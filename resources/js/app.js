import '../css/app.css'
import Message from './utils/classes/showMessage'
import { clear } from './utils/functions/clear'

const form = document.getElementById('upload-form')
const inputTransaction = document.querySelector('input')

const tbody = document.querySelector('tbody')

form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()
  try {
    const {
      data: { error, message },
    } = await (
      await fetch('/api/upload', {
        method: 'POST',
        body: new FormData(this),
      })
    ).json()

    inputTransaction.value = ''

    if (error) {
      throw new Error(message)
    }

    const msg = new Message({ error, message })
    msg.showMessage()
    show_importacoes()
  } catch ({ message }) {
    const msg = new Message({ error: true, message })
    msg.showMessage()
  }
}

async function show_importacoes() {
  const { data } = await (await fetch('/api/importacoes')).json()

  //Limpa a Tabela
  clear('importacoes', tbody)
  //Adiciona Os valores na ui
  data.forEach(({ dataTransacao, dataImportacao }) => {
    const tr = document.createElement('tr')
    tr.className = 'container'

    const tdTransacao = document.createElement('td')
    const tdImportacao = document.createElement('td')

    tdTransacao.innerText = dataTransacao
    tdImportacao.innerText = dataImportacao

    tr.appendChild(tdTransacao)
    tr.appendChild(tdImportacao)

    tbody.appendChild(tr)
  })
}
