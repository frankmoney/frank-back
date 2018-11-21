import WherePidBase from './WherePidBase'

export default interface WherePid extends WherePidBase {
  or?: WherePid | WherePid[]
  and?: WherePid | WherePid[]
}
