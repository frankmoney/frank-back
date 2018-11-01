import Database from 'store/Database'
import ICreateTable0 from '../ICreateTable0'
import ICreateTable1 from '../ICreateTable1'
import CreateTableColumn from './CreateTableColumn'

export default class CreateTable implements ICreateTable0, ICreateTable1<any> {
  public constructor(
    name: any,
    config?: {
      before: ((db: Database) => Promise<void>)[]
      after: ((db: Database) => Promise<void>)[]
    }
  ) {
    this._name = name
    this._before = (config && config.before) || []
    this._after = (config && config.after) || []
  }

  public before(exec: any): any {
    return new CreateTable(this._name, {
      before: [...this._before, exec],
      after: [...this._after],
    })
  }

  public after(exec: any): any {
    return new CreateTable(this._name, {
      before: [...this._before],
      after: [...this._after, exec],
    })
  }

  public column(column: any, def: any): any {
    return new CreateTableColumn(this._name, {
      columns: [
        {
          name: typeof column === 'function' ? column(this._name) : column,
          def,
        },
      ],
      before: [...this._before],
      after: [...this._after],
    })
  }

  private readonly _name: any
  private readonly _before: ((db: Database) => Promise<void>)[]
  private readonly _after: ((db: Database) => Promise<void>)[]
}
