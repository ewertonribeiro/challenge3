export default class ShowMessage {
  divMessage
  span
  btn
  data
  constructor({ data }) {
    this.divMessage = document.getElementById('message')
    this.span = document.getElementById('message-span')
    this.btn = document.getElementById('close-message')

    this.data = data
  }

  clearMessage() {
    this.divMessage.classList.remove('message-danger')
    this.divMessage.classList.remove('message-success')
    this.divMessage.classList.add('hidden')
  }


  addProperClass() {
    this.data.error
      ? this.divMessage.classList.add('message-danger')
      : this.divMessage.classList.add('message-success')
  }

  showMessage() {
    this.btn.addEventListener('click', ()=> this.clearMessage())
    this.clearMessage()
    this.addProperClass()

    this.divMessage.classList.remove('hidden')
    this.span.textContent = this.data.message
  }
}
