class UpdateUi {
  constructor(element) {
    this.element = element
  }

  async requestServer(method, url, body) {
    if (!body) {
      const response = await fetch(url, { method })

      return await response.json()
    }
    const response = await fetch(url, { method, body })

    return await response.json()
  }
}

export { UpdateUi as updateUi }
