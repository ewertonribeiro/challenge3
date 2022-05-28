import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'node:fs'
import readline from 'node:readline'
import transacao from "../../Models/Transacao"

interface Transacao {
  bancoorigem: string
  agenciaorigem: number
  contaorigem: string
  bancodestino: string
  agenciadestino: number
  contadestino: string
  valortransacao: number
  data: Date
}

export default class FilesController {
  private fileValidationOptions: { extnames: ['csv']; size: '3mb' }

  public async store({ request, response }: HttpContextContract) {
    const file = request.file('file', this.fileValidationOptions)

    if (!file) {
      response.status(400)
      return {
        data: {
          erro: true,
          mensagem:'Arquivo Inexistente'
        }
      }
      } else if (file.size === 0) {
      response.status(400)
      return {
        data: {
          erro: true,
          mensagem:"O Arquivo nao pode estar vazio!"
        }
      }
      } else if (file.extname !== 'csv') {
      response.status(400)
      return {
        data: {
          erro: true,
          mensagem:"So e permitido arquivos do tipo csv!"
        }
      }
      }

    //Manda Para a parta uploads
    await file.move(Application.tmpPath('uploads'))

    if (!file.filePath) {
      return
    }

    //Converte em um array de transacoes
    const transacoes = await this.readCsv(file.filePath)
  
    //A data Da primeira Transacao do arquivo
    const validDate = this.convertDate(transacoes[0].data)

    const validTransactionDate = transacoes.filter(transacao=> this.convertDate(transacao.data) == validDate)

    await transacao.createMany(validTransactionDate)

    return {
      data: {
        fileName: file.fileName,
        size: file.size,
        mensagem: 'Upload Feito Com Sucesso',
      },
    }
  }

  private convertToJson(transacao: string): Transacao {
    const values = transacao.split(',')

    const t: Transacao = {
      bancoorigem: values[0],
      agenciaorigem: Number(values[1]),
      contaorigem: values[2],
      bancodestino: values[3],
      agenciadestino: Number(values[4]),
      contadestino: values[5],
      valortransacao: Number(values[6]),
      data: new Date(values[7]),
    }

    return t
  }

  private async readCsv(file: fs.PathLike): Promise<Transacao[]> {
    const fileStream = fs.createReadStream(file)

    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

    let transacoesDia: Transacao[] = []
    for await (const line of rl) {
      let transacao = this.convertToJson(line)
      transacoesDia.push(transacao)
    }

    return transacoesDia
  }

  private convertDate(date:Date){
    const data = {
      day:date.getDay(),
      month:date.getMonth(),
      year:date.getFullYear()
    }
    return `${data.day}/${data.month}/${data.year}`
  }
}
