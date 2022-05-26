import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'node:fs'
import readline from 'node:readline'
//import transacao from '../../../app/Models/Transacao'

interface Transacao {
  bancoOrigem: string
  agenciaOrigem: number
  contaOrigem: string
  bancoDestino: string
  agenciaDestino: number
  contaDestino: string
  valorTransacao: number
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
          erro: 'Arquivo Inexistente',
        }
      }
    } else if (file.size === 0) {
      response.status(400)
      return {
        data: {
          error: 'Nao e permitido aruivos vazios',
        }
      }
    } else if (file.extname !== 'csv') {
      response.status(400)
      return {
        data: {
          erro: 'So e permitido arquivos do tipo .csv',
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

    console.log(transacoes[0].data === transacoes[1].data)
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
      bancoOrigem: values[0],
      agenciaOrigem: Number(values[1]),
      contaOrigem: values[2],
      bancoDestino: values[3],
      agenciaDestino: Number(values[4]),
      contaDestino: values[5],
      valorTransacao: Number(values[6]),
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
}
