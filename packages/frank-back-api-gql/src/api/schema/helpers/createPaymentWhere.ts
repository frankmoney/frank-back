import { isNil, mergeDeepRight } from 'ramda'
import PaymentWhere from 'api/dal/Payment/helpers/PaymentWhere'
import CategoryType from 'api/types/CategoryType'
import Date from 'api/types/Date'
import Pid from 'api/types/Pid'

const createPaymentWhere = (
  args: {
    postedOnMin?: Date
    postedOnMax?: Date
    amountMin?: number
    amountMax?: number
    verified?: boolean
    pending?: boolean
    sourcePids?: null | Pid[]
    search?: string
    categoryType?: CategoryType
  },
  extensions?: Partial<PaymentWhere>
): PaymentWhere => {
  const where: PaymentWhere = {}

  if (args) {
    if (!isNil(args.postedOnMin) || !isNil(args.postedOnMax)) {
      where.postedOn = {}
      if (!isNil(args.postedOnMin)) {
        where.postedOn.gte = args.postedOnMin
      }
      if (!isNil(args.postedOnMax)) {
        where.postedOn.lte = args.postedOnMax
      }
    }

    if (!isNil(args.amountMin) || !isNil(args.amountMax)) {
      where.amount = {}
      if (!isNil(args.amountMin)) {
        where.amount!.gte = args.amountMin
      }
      if (!isNil(args.amountMax)) {
        where.amount!.lte = args.amountMax
      }
    }

    if (!isNil(args.verified)) {
      where.verified = { eq: args.verified }
    }

    if (!isNil(args.pending)) {
      where.pending = { eq: args.pending }
    }

    if (!isNil(args.sourcePids)) {
      where.source = { pid: { in: args.sourcePids.map(x => Number(x)) } }
    }

    if (args.search) {
      where.containsText = args.search
    }

    if (!isNil(args.categoryType)) {
      where.category = {
        type: {
          eq: args.categoryType,
        },
      }
    }
  }

  return extensions ? mergeDeepRight(where, extensions) : where
}

export default createPaymentWhere
