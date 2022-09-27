const btnLogout = document.getElementById('logout-btn')

btnLogout.addEventListener('click', handleClick)

async function handleClick() {
  await fetch('/api/logout', { method: 'DELETE' })

  window.location.assign('/login')
}
