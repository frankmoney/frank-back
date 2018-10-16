import { Type } from 'gql'
import Category from 'store/types/Category'
import getAccountByCategoryId from 'api/dal/Account/getAccountByCategoryId'
import getPeerByPidAndCategoryId from 'api/dal/Peer/getPeerByPidAndCategoryId'
import listPaymentsByCategoryId from 'api/dal/Payment/listPaymentsByCategoryId'
import mapAccount from 'api/mappers/mapAccount'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import PaymentType from './PaymentType'
import PeerType from './PeerType'

const CategoryType = Type('Category', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    color: field.ofString(),
    account: field.ofType(AccountType).resolve(
      createPrivateResolver('Category:account', async ({ parent, scope }) => {
        const category: Category = parent.$source

        const account = await getAccountByCategoryId(
          { categoryId: category.id },
          scope
        )

        return mapAccount(account)
      })
    ),
    peer: field
      .ofType(PeerType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Category:peer',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const peer = await getPeerByPidAndCategoryId(
              { categoryId: category.id, pid: args.pid },
              scope
            )

            return mapPeer(peer)
          }
        )
      ),
    payments: field.listOf(PaymentType).resolve(
      createPrivateResolver('Category:payments', async ({ parent, scope }) => {
        const category: Category = parent.$source

        const payments = await listPaymentsByCategoryId(
          { categoryId: category.id },
          scope
        )

        return mapPayment(payments)
      })
    ),
  }))
)

export default CategoryType
