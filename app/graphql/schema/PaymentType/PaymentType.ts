import { ID, Type } from 'gql'
import AccountType from '../AccountType'
import CategoryType from '../CategoryType'
import PeerType from '../PeerType'
import paymentAccount from './paymentAccount'
import paymentCategory from './paymentCategory'
import paymentPeer from './paymentPeer'

const PaymentType = Type('Payment', type =>
  type.fields(field => ({
    id: field.ofType(ID),

    postedOn: field.ofDate(),

    amount: field.ofFloat(),

    peerName: field.ofString().nullable(),

    description: field.ofString().nullable(),

    rawData: field.ofJson().nullable(),

    account: field.ofType(AccountType).resolve(paymentAccount),

    category: field.ofType(CategoryType).resolve(paymentCategory),

    peer: field.ofType(PeerType).nullable().resolve(paymentPeer),
  }))
)

export default PaymentType
