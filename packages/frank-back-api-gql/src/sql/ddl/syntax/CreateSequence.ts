import Database from 'store/Database'
import { Sql } from '../../ast'
import { sql } from '../../gen'
import Executable from './Executable'

export type CreateSequenceConfig<TSequenceName extends string | Sql> = {
  name: TSequenceName
}

export default class CreateSequence<TSequenceName extends string | Sql>
  implements Executable {
  public constructor(config: CreateSequenceConfig<TSequenceName>) {
    this.config = config
  }

  public async exec(db: Database): Promise<void> {
    const name = this.config.name.toString()

    await db.command(sql.unparameterized`
      create sequence "${name}";
    `)
  }

  protected readonly config: CreateSequenceConfig<TSequenceName>
}
