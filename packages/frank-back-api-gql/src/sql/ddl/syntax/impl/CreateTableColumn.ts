import Database from 'store/Database'
import { join, raw, sql } from '../../../gen'
import ICreateTableColumn0 from '../ICreateTableColumn0'
import ICreateTableColumn1 from '../ICreateTableColumn1'

export default class CreateTableColumn
  implements ICreateTableColumn0, ICreateTableColumn1<any> {
  public constructor(
    name: any,
    {
      columns,
      before,
      after,
    }: {
      columns: { name: any; def: any }[]
      before: ((db: Database) => Promise<void>)[]
      after: ((db: Database) => Promise<void>)[]
    }
  ) {
    this._name = name
    this._columns = columns
    this._before = before
    this._after = after
  }

  public before(exec: any): any {
    return new CreateTableColumn(this._name, {
      columns: [...this._columns],
      before: [...this._before, exec],
      after: [...this._after],
    })
  }

  public after(exec: any): any {
    return new CreateTableColumn(this._name, {
      columns: [...this._columns],
      before: [...this._before],
      after: [...this._after, exec],
    })
  }

  public column(column: any, def: any): any {
    return new CreateTableColumn(this._name, {
      columns: [
        ...this._columns,
        {
          name: typeof column === 'function' ? column(this._name) : column,
          def,
        },
      ],
      before: [...this._before],
      after: [...this._after],
    })
  }

  public async exec(db: Database): Promise<void> {
    for (const each of this._before) {
      await each(db)
    }

    const columns = this._columns.map(x => {
      const def = typeof x.def === 'string' ? raw(x.def) : x.def
      return sql`${raw(x.name)} ${def}`
    })

    await db.command(sql`
      create table "${raw(this._name)}" (
        ${join(columns, ',\n        ')}
      );
    `)

    for (const each of this._after) {
      await each(db)
    }
  }

  private readonly _name: any
  private readonly _columns: { name: any; def: any }[]
  private readonly _before: ((db: Database) => Promise<void>)[]
  private readonly _after: ((db: Database) => Promise<void>)[]
}
