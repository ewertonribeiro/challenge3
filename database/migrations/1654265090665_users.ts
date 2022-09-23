import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true })
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.boolean('ativo').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async db=> {
      await db.table('users').insert({name:'Admin',email:'admin@email.com.br',senha:'123999'});
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
