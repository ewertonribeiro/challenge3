import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'node:fs'
import readline from 'node:readline'
import transacao from '../../Models/Transacao'
import DaysDone from '../../Models/Importacoes'
import { MyError, FileResponse } from './../../utils/classes/Responses/MyResponses'

interface Transacao {
  bancoorigem: string
  agenciaorigem: string
  contaorigem: string
  bancodestino: string
  agenciadestino: string
  contadestino: string
  valortransacao: number
  data: Date
}

export default class FilesController {
  public async store({ request, response }: HttpContextContract) {
    const file = request.file('file', { extnames: ['csv'], size: '3mb' })
console.log(request)
    //Valida O Arquivo
    if (!file) {
      response.status(400)
      return new MyError('Arquivo Inexistente')
    } else if (!file.isValid) {
      response.status(400)
      return new MyError(
        'Erro ao fazer o upload , verifique se o arquivo esta vazio ou a extenção é csv!'
      )
    }

    //Manda Para a pasta uploads
    await file.move(Application.tmpPath('uploads'))

    if (!file.filePath) return

    //Converte em um array de transacoes
    const transacoes = await this.readCsv(file.filePath)

    //Data valida da Primeira Transação
    const validDate = this.convertDate(transacoes[0].data)

    //A data Da primeira Transacao do arquivo
    if (!(await this.validateTransactionsDate(validDate)))
      return new MyError('Ja foram registradas transações nesta data')

    //Filtra as Transacoes
    const validTransactions = this.filterTransactions(transacoes, validDate)

    //Inserção no banco de Dados
    try {
      await transacao.createMany(validTransactions)
      await DaysDone.create({
        done: true,
        date: validDate,
        totaltransacoes: validTransactions.length,
      })
      return new FileResponse('Upload feito com sucesso!', file.size, file.fileName)
    } catch {
      return new MyError('Problema ao Insesir no Banco , Verifique o Arquivo e tente novamente.')
    }

  }

  private filterTransactions(transacoes: Transacao[], validDate: string) {
    return transacoes
      .filter((transacao) => this.convertDate(transacao.data) === validDate)
      .filter((transacao) => {
        const values = Object.values(transacao).findIndex((item) => !item)

        if (values < 0) return transacao
      })
  }

  private async validateTransactionsDate(validDate: string) {
    const daysAlreadyDone = await DaysDone.findBy('date', validDate)

    if (daysAlreadyDone) return false
    else return true
  }

  private convertToJson(transacao: string): Transacao {
    const values = transacao.split(',')

    const t: Transacao = {
      bancoorigem: values[0],
      agenciaorigem: values[1],
      contaorigem: values[2],
      bancodestino: values[3],
      agenciadestino: values[4],
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

  private convertDate(date: Date) {
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
  }
}
