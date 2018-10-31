import Database from 'store/Database'
import { raw, sql } from '../../../gen'
import ICreateForeignKeyOnColumnReferencingColumn00 from '../ICreateForeignKeyOnColumnReferencingColumn00'
import ICreateForeignKeyOnColumnReferencingColumn01 from '../ICreateForeignKeyOnColumnReferencingColumn01'
import ICreateForeignKeyOnColumnReferencingColumn10 from '../ICreateForeignKeyOnColumnReferencingColumn10'
import ICreateForeignKeyOnColumnReferencingColumn11 from '../ICreateForeignKeyOnColumnReferencingColumn11'

export default class CreateForeignKeyOnColumnReferencingColumn
  implements
    ICreateForeignKeyOnColumnReferencingColumn00,
    ICreateForeignKeyOnColumnReferencingColumn10<any>,
    ICreateForeignKeyOnColumnReferencingColumn01<any>,
    ICreateForeignKeyOnColumnReferencingColumn11<any, any> {
  public constructor(
    name: any,
    table: any,
    columns: any,
    foreignTable: any,
    ...foreignColumns: any[]
  ) {
    this._name = name
    this._table = table
    this._columns = columns
    this._foreignTable = foreignTable
    this._foreignColumns = foreignColumns
  }

  public column(column: any): any {
    return new CreateForeignKeyOnColumnReferencingColumn(
      this._name,
      this._table,
      this._columns,
      this._foreignTable,
      ...this._foreignColumns,
      typeof column === 'function' ? column(this._foreignTable) : column
    )
  }

  public async exec(db: Database): Promise<void> {
    const columns = this._columns.map(x => `${x}`)
    const foreignColumns = this._foreignColumns.map(x => `${x}`)

    const name =
      this._name ||
      `uq:${this._table}(${columns.join(',')})` +
        `->${this._foreignTable}(${foreignColumns.join(',')})`

    const columnsSql = raw(columns.map(x => `"${x}"`).join(', '))

    const foreignColumnsSql = raw(foreignColumns.map(x => `"${x}"`).join(', '))

    await db.command(sql`
      alter table "${raw(this._table)}"
      add constraint "${raw(name)}"
      foreign key ( ${columnsSql} )
      references "${raw(this._foreignTable)}" ( ${foreignColumnsSql} );
    `)
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
  private readonly _foreignTable: any
  private readonly _foreignColumns: any[]
}
