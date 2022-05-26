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
  console.log(await response.json())
}



function showMessage(message) {
  // let messages = ['danger','erro',success]

  var divMessage = document.getElementById('message')
  var span = document.getElementById('message-span')

  divMessage.classList.remove('hidden')
  span.textContent = message.data.mensagem
  // if (message.erro) {
  //   divMessage.classList.add('message-danger')
  // } else {
  //   divMessage.classList.add('message.data.mensagem')
  // }

  message.data.erro ? divMessage.classList.add('message-danger') :
    divMessage.classList.add('message-success')


  setTimeout(() => {
    console.log("setTimeout")
    divMessage.classList.add('hidden')
  }, 3000)
}

showMessage({ data: { erro: true, mensagem: "Ocorreu um erro" } })

