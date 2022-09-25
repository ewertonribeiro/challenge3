const formLogin = document.getElementById('login-form')

async function handleSubmitLogin(e) {
  e.preventDefault()
  console.log(e)
}

formLogin.addEventListener('submit', handleSubmitLogin)
