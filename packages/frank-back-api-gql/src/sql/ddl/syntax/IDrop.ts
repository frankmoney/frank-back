import Identifier from '../Identifier'
import TableName from '../TableName'
import IDropConstraint from './IDropConstraint'
import IDropConstraintNamed from './IDropConstraintNamed'
import IDropIndex from './IDropIndex'
import IDropIndexNamed from './IDropIndexNamed'
import IDropTable0 from './IDropTable0'
import IDropTable1 from './IDropTable1'

/* tslint:disable:unified-signatures */
export default interface IDrop {
  constraint(): IDropConstraint
  constraint(name: string): IDropConstraintNamed
  constraint(name: Identifier): IDropConstraintNamed

  index(): IDropIndex
  index(name: string): IDropIndexNamed

  table(name: string): IDropTable0
  table<TTableName extends TableName>(name: TTableName): IDropTable1<TTableName>
}
