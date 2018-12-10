import { isNil, mergeDeepRight } from 'ramda'
import PaymentWhere from '../../dal/Payment/helpers/PaymentWhere'
import PeerPaymentsWhere from '../../dal/Peer/helpers/PeerPaymentsWhere'
import PeerWhere from '../../dal/Peer/helpers/PeerWhere'

const createPeerWhere = (
  args: {
    donors?: null | boolean
    recipients?: null | boolean
    search?: null | string
  },
  extensions?: Partial<PeerWhere>
) => {
  const where: PeerWhere = {}

  if (args) {
    if (!isNil(args.donors) || !isNil(args.recipients)) {
      // { donors: true, recipients: true } is equivalent to all
      if (args.donors !== true || args.recipients !== null) {
        const wherePaymentsBranches: PeerPaymentsWhere[] = []

        if (!isNil(args.donors)) {
          const predicate: PaymentWhere = {
            amount: {
              gt: 0,
            },
          }
          wherePaymentsBranches.push(
            args.donors ? { any: predicate } : { none: predicate }
          )
        }

        if (!isNil(args.recipients)) {
          const predicate: PaymentWhere = {
            amount: {
              lt: 0,
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
