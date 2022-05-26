import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'origem' })
  public bancoOrigem: string

  @column()
  public agenciaOrigem: number

  @column()
  public contaOrigem: string

  @column({ columnName: 'destino' })
  public bancoDestino: string

  @column()
  public agenciaDestino: number

  @column()
  public contaDestino: string

  @column({ columnName: 'valor' })
  public valorTransacao: number

  @column({})
  public data: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
