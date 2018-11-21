import Pid from 'store/types/Pid'

export default interface WherePidBase {
  eq?: Pid
  gt?: Pid
  lt?: Pid
  gte?: Pid
  lte?: Pid
}
