import createPrivateResolver from 'utils/createPrivateResolver'
import R from 'ramda'

export default createPrivateResolver(
  'storyPaymentsDateRange',
  async ({ parent, assert, args, prisma: { query } }) => {
    const payments = await query.payments(
      {
        where: {
          storyData: { id: parent.id },
        },
        orderBy: 'postedOn_DESC',
      },
      '{ postedOn }',
    )

    const dates = R.map(p => p.postedOn, payments)

    if (dates.length === 1) {
      return dates
    } else if (dates.length > 1) {
      return [dates.pop(), dates[0]]
    }

    return []
  },
)
