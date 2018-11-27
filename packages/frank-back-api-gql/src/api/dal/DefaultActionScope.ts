import Database from 'store/Database'
import Scope from 'api/Scope'
import UnitOfWork from 'api/UnitOfWork'

export default interface DefaultActionScope {
  logFor: typeof Scope.prototype.logFor
  uow: UnitOfWork
  db: Database
}
