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
}

function showMessage({data}) {
  // let messages = ['danger','erro',success]

  var divMessage = document.getElementById('message')
  var span = document.getElementById('message-span')

  data.erro ? divMessage.classList.add('message-danger') :
    divMessage.classList.add('message-success')

  divMessage.classList.remove('hidden')
  span.textContent = data.mensagem
  


  setTimeout(() => {
    console.log("setTimeout")
    divMessage.classList.remove('message-danger')
    divMessage.classList.remove('message-success')
    divMessage.classList.add('hidden')

  }, 3000)
}



