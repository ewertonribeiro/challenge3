class updateUi {
    constructor(element){
      this.element = element
    }
  
    async requestPOST(method , url , body){
      const response = await fetch(url, {method,body})
  
      return await response.json()
    }
    async requestGET(method , url){
      const response = await fetch(url , {method})
  
      return await response.json()
      
    }
  }

export {updateUi}
  