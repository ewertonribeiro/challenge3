export default class ShowMessage {
  divMessage = document.getElementById('message')
  span = document.getElementById('message-span')
  btn = document.getElementById('close-message')

  data

  constructor(data) {
    this.btn.addEventListener('click', () => this.clearMessage())

    this.data = data
  }

  clearMessage() {
    this.divMessage.classList.remove('bg-danger')
    this.divMessage.classList.remove('bg-success')
    this.divMessage.classList.add('d-none')
  }

  addProperClass() {
    this.data.error
      ? this.divMessage.classList.add('bg-danger')
      : this.divMessage.classList.add('bg-success')
  }

  showMessage() {
    this.clearMessage()
    this.addProperClass()

    this.divMessage.classList.remove('d-none')
    this.span.textContent = this.data.message
  }
}
