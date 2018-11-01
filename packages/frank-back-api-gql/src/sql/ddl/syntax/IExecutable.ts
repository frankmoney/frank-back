import Database from 'store/Database'

export default interface IExecutable {
  exec(db: Database): Promise<void>
}
