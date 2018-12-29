import Json from './Json'
import Pid from './Pid'

export default interface CategoryUpdateUpdate {
  title: undefined | null | string
  cover: undefined | null | Json
  body: undefined | null | Json
  paymentPids: undefined | null | Pid[]
}
