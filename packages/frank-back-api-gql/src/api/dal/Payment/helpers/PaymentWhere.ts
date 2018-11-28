import WhereBoolean from '../../helpers/WhereBoolean'
import WhereDate from '../../helpers/WhereDate'
import WhereId from '../../helpers/WhereId'
import WhereIdNullable from '../../helpers/WhereIdNullable'
import WhereNumber from '../../helpers/WhereNumber'

export default interface PaymentWhere {
  amount?: WhereNumber
  postedOn?: WhereDate
  verified?: WhereBoolean
  pending?: WhereBoolean
  containsText?: string
  accountId?: WhereId
  categoryId?: WhereIdNullable
  peerId?: WhereIdNullable
  or?: PaymentWhere | PaymentWhere[]
  and?: PaymentWhere | PaymentWhere[]
}
