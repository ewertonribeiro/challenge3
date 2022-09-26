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
  } catch ({ message }) {
    const msg = new Message({ error: true, message })
    msg.showMessage()
  }

  // clear('importacoes', tbody)
  // show_importacoes()

  //Tratar a resposta
  //Caso Seja de sucesso recarregar a pagina
  //Erro mostrar a mensagem de erro
}

// async function show_importacoes() {
//   // await requestServer('get', '/api/importacoes')
//   const importacoes = await (await fetch('/api/importacoes')).json()

//   //Adiciona Os valores na ui
//   importacoes.forEach(({ data: { dataTransacao, dataImportacao } }) => {
//     const tr = document.createElement('tr')
//     tr.className = 'container'

//     const tdTransacao = document.createElement('td')
//     const tdImportacao = document.createElement('td')

//     tdTransacao.innerText = dataTransacao
//     tdImportacao.innerText = formatDate(dataImportacao)

//     tr.appendChild(tdTransacao)
//     tr.appendChild(tdImportacao)

//     tbody.appendChild(tr)
//   })
// }

// show_importacoes()
