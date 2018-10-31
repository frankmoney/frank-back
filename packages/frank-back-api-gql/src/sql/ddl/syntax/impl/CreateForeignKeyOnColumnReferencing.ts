import ICreateForeignKeyOnColumnReferencing00 from '../ICreateForeignKeyOnColumnReferencing00'
import ICreateForeignKeyOnColumnReferencing01 from '../ICreateForeignKeyOnColumnReferencing01'
import ICreateForeignKeyOnColumnReferencing10 from '../ICreateForeignKeyOnColumnReferencing10'
import ICreateForeignKeyOnColumnReferencing11 from '../ICreateForeignKeyOnColumnReferencing11'
import CreateForeignKeyOnColumnReferencingColumn from './CreateForeignKeyOnColumnReferencingColumn'

export default class CreateForeignKeyOnColumnReferencing
  implements
    ICreateForeignKeyOnColumnReferencing00,
    ICreateForeignKeyOnColumnReferencing10<any>,
    ICreateForeignKeyOnColumnReferencing01<any>,
    ICreateForeignKeyOnColumnReferencing11<any, any> {
  public constructor(name: any, table: any, columns: any[], foreignTable: any) {
    this._name = name
    this._table = table
    this._columns = columns
    this._foreignTable = foreignTable
  }

  public column(column: any): any {
    return new CreateForeignKeyOnColumnReferencingColumn(
      this._name,
      this._table,
      this._columns,
      this._foreignTable,
      typeof column === 'function' ? column(this._foreignTable) : column
    )
  }

  private readonly _name: any
  private readonly _table: any
  private readonly _columns: any[]
  private readonly _foreignTable: any
}
