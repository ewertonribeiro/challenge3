;(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var form = document.getElementById('login-form')

  // Loop over them and prevent submission

  form.addEventListener(
    'submit',
    async function (event) {
      if (form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        await login(this)
      }

      event.preventDefault()
      form.classList.add('was-validated')
    },
    true
  )
})()

async function login(form) {
  const formData = new FormData(form)

  try {
    const response = await (
      await fetch('/api/login', {
        method: 'POST',
        body: formData,
      })
    ).json()

    if (response.data.error) {
      throw new Error(response.data.message)
    }

    window.location.assign('/')
  } catch ({ message }) {
    //Exibir a Mensagem de Erro
    console.log(message)
  }
}
