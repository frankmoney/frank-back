import { Type } from 'gql'
import mapPayment from 'store/mappers/mapPayment'
import Peer from 'store/types/Peer'
import getAccountByPeerId from 'api/dal/Account/getAccountByPeerId'
import listPaymentsByPeerId from 'api/dal/Payment/listPaymentsByPeerId'
import mapAccount from 'api/mappers/mapAccount'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import PaymentType from './PaymentType'

const PeerType = Type('Peer', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    account: field.ofType(AccountType).resolve(
      createPrivateResolver('Peer:account', async ({ parent, scope }) => {
        const peer: Peer = parent.$source

        const account = await getAccountByPeerId({ peerId: peer.id }, scope)

        return mapAccount(account)
      })
    ),
    payments: field.listOf(PaymentType).resolve(
      createPrivateResolver('Peer:payments', async ({ parent, scope }) => {
        const peer: Peer = parent.$source

        const payments = await listPaymentsByPeerId({ peerId: peer.id }, scope)

        return mapPayment(payments)
      })
    ),
  }))
)

export default PeerType
