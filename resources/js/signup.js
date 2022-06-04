
var signupForm = document.getElementById('user-form')

signupForm.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/users', {
    method: 'post',
    body: new FormData(this),
  })

  console.log(await response.json())

}
