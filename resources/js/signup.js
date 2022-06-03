const btn = document.getElementById('user-btn')

btn.addEventListener('click', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()

  console.log("Clicked")
}
