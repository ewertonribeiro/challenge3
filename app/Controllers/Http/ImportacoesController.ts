import { DateTime } from 'luxon'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Importacao from 'App/Models/Importacoes'

type Import = {
  dataTransacao: string
  dataImportacao: string
}
class ImportacaoResponse {
  public data: Import[]

  constructor() {
    this.data = []
  }

  public addImportacao({ date, createdAt }: Importacao) {
    this.data.push({ dataTransacao: date, dataImportacao: this.formatDate(createdAt) })
  }

  public formatDate(dataImportacao: DateTime) {
    //Formata a data
    const data = `${dataImportacao.day}/${dataImportacao.month + 1}/${dataImportacao.year} - ${
      dataImportacao.hour
    }:${dataImportacao.minute}:${dataImportacao.second}`

    return data
  }
}

export default class ImportacoesController {
  private model = Importacao

  public async index({ response }: HttpContextContract) {
    const importacoes = await this.model.all()
    const returnedImportacoes = new ImportacaoResponse()

    importacoes.forEach((importacao) => returnedImportacoes.addImportacao(importacao))

    response.status(200)
    return returnedImportacoes
  }
}
