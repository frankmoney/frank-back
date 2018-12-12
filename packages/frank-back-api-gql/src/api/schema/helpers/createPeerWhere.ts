import { isNil, mergeDeepRight } from 'ramda'
import { CategoryType } from 'store/enums'
import PaymentWhere from 'api/dal/Payment/helpers/PaymentWhere'
import PeerPaymentsWhere from 'api/dal/Peer/helpers/PeerPaymentsWhere'
import PeerWhere from 'api/dal/Peer/helpers/PeerWhere'

const createPeerWhere = (
  args: {
    donors?: null | boolean
    recipients?: null | boolean
    search?: null | string
  },
  extensions?: Partial<PeerWhere>
): PeerWhere => {
  const where: PeerWhere = {}

  if (args) {
    if (!isNil(args.donors) || !isNil(args.recipients)) {
      // { donors: true, recipients: true } is equivalent to all
      if (args.donors !== true || args.recipients !== null) {
        const wherePaymentsBranches: PeerPaymentsWhere[] = []

        if (!isNil(args.donors)) {
          const predicate: PaymentWhere = {
            category: {
              type: {
                eq: CategoryType.revenue,
              },
            },
          }
          wherePaymentsBranches.push(
            args.donors ? { any: predicate } : { none: predicate }
          )
        }

        if (!isNil(args.recipients)) {
          const predicate: PaymentWhere = {
            category: {
              type: {
                eq: CategoryType.spending,
              },
            },
          }
          wherePaymentsBranches.push(
            args.recipients ? { any: predicate } : { none: predicate }
          )
        }

        where.payments =
          wherePaymentsBranches.length === 2
            ? { and: wherePaymentsBranches }
            : wherePaymentsBranches[0]
      }
    }

    if (!isNil(args.search)) {
      where.name = {
        contains: args.search,
      }
    }
  }

  return extensions ? mergeDeepRight(where, extensions) : where
}

export default createPeerWhere
