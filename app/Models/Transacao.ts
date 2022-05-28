import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bancoorigem: string

  @column()
  public agenciaorigem: number

  @column()
  public contaorigem: string

  @column()
  public bancodestino: string

  @column()
  public agenciadestino: number

  @column()
  public contadestino: string

  @column()
  public valortransacao: number

  @column({})
  public data: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
