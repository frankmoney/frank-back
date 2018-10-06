import { Sql } from '../../ast'
import DropTable from './DropTable'

export default class Drop {
  public table<TTableName extends string | Sql>(name: TTableName) {
    return new DropTable<TTableName>({ name })
  }
}
