import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transacoes extends BaseSchema {
  protected tableName = 'transacaos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('bancoorigem')
      table.integer('agenciaorigem')
      table.string('contaorigem')
      table.string('bancodestino')
      table.integer('agenciadestino')
      table.string('contadestino')
      table.float('valortransacao')
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
