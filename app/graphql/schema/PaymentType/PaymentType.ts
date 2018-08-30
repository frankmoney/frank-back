import { ID, Type } from 'gql'
import AccountType from '../AccountType'
import account from './account'

const PaymentType = Type('Payment', type =>
  type.fields(field => ({
    id: field.ofType(ID),

    postedOn: field.ofDate(),

    amount: field.ofFloat(),

    peerName: field.ofString().nullable(),

    description: field.ofString().nullable(),

    rawData: field.ofJson().nullable(),

    account: field.ofType(AccountType).resolve(account),

    // peer: field
    //   .ofType(PeerType)
    //   .nullable()
    //   .resolve(peer),
  }))
)

export default PaymentType
