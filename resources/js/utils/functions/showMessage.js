export function showMessage({ data }) {

  var divMessage = document.getElementById('message');
  var span = document.getElementById('message-span');
console.log(data)
  data.error
    ? divMessage.classList.add('message-danger')
    : divMessage.classList.add('message-success');

  divMessage.classList.remove('hidden');
  span.textContent = data.message;

  setTimeout(() => {
    divMessage.classList.remove('message-danger');
    divMessage.classList.remove('message-success');
    divMessage.classList.add('hidden');
  }, 3000);
}

