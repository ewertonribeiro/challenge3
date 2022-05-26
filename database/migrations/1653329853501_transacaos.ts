import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transacoes extends BaseSchema {
  protected tableName = 'transacoes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('bancoOrigem')
      table.integer('agenciaOrigem')
      table.string('contaOrigem')
      table.string('bancoDestino')
      table.integer('agenciaDestino')
      table.string('contaDestino')
      table.float('valorTransacao')
      table.date('data')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
