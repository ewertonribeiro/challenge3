import { DateTime } from 'luxon'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Importacao from 'App/Models/Importacoes'

class ImportacaoResponse {
  public data: {
    dataTransacao: string
    dataImportacao: DateTime
  }
  constructor(data: string, importacaoData: DateTime) {
    this.data = {
      dataTransacao: data,
      dataImportacao: importacaoData,
    }
  }
}

export default class ImportacoesController {
  private model = Importacao

  public async index({ response }: HttpContextContract) {
    const importacoes = await this.model.all()

    const returnedImportacoes = importacoes.map((importacao) => {
      return new ImportacaoResponse(importacao.date, importacao.createdAt)
    })

    return returnedImportacoes
  }
}
