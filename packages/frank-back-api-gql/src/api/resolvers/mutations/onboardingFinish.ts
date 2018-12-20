import R from 'ramda'
import accountCreationNotification from '@frankmoney/frank-mail/accountCreationNotification'
import { UserType } from 'store/enums'
import createMutations from 'utils/createMutations'
import createAccount from 'api/dal/Account/createAccount'
import createCategories from 'api/dal/Category/createCategories'
import CategoryType from 'api/types/CategoryType'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import updatePaymentsBySourceId from 'api/dal/Payment/updatePaymentsBySourceId'
import updateSource from 'api/dal/Source/updateSource'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import getUser from 'api/dal/User/getUser'
import listUsers from 'api/dal/User/listUsers'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapAccount from 'api/mappers/mapAccount'
import { COMPLETED_STEP, TEAM_STEP } from 'api/onboarding/constants'
import AccountType from 'api/schema/AccountType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingFinish = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({ log, scope }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (!existingOnboarding || existingOnboarding.step !== TEAM_STEP) {
      return throwArgumentError()
    }

    const name =
      existingOnboarding.account.frankTitle || existingOnboarding.account.name

    const team = await getTeamByUserId({ userId: scope.user.id }, scope)

    const account = await createAccount(
      {
        teamId: team.id,
        name,
        currencyCode: existingOnboarding.account.currencyCode,
        creatorId: scope.user.id,
      },
      scope
    )

    await updateSource(
      {
        id: existingOnboarding.sourceId,
        accountId: account.id,
      },
      scope
    )

    const categories = existingOnboarding.categories || {}

    const spendingCategories = R.map(
      c => ({
        ...c,
        type: CategoryType.spending,
      }),
      categories.spending || []
    )

    const revenueCategories = R.map(
      c => ({
        ...c,
        type: CategoryType.revenue,
      }),
      categories.revenue || []
    )

    await createCategories(
      {
        accountId: account.id,
        categories: R.concat(spendingCategories, revenueCategories),
      },
      scope
    )

    await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        step: COMPLETED_STEP,
      },
      scope
    )

    await updatePaymentsBySourceId(
      {
        sourceId: existingOnboarding.sourceId,
        accountId: account.id,
      },
      scope
    )

    const creator = await getUser(
      { where: { id: { eq: scope.user.id } } },
      scope
    )

    const users = await listUsers(
      {
        where: {
          typeId: { eq: UserType.person },
          teamMembers: {
            any: {
              team: { id: { eq: team.id } },
            },
          },
        },
      },
      scope
    )

    await scope.uow.commit()

    await Promise.all(
      users.map(async user => {
        try {
          const mail = accountCreationNotification({
            data: {
              user,
              creator,
              link: scope.config.MAIL.links.accountCreationNotification({
                accountPid: account.pid,
              }),
            },
          })

          await scope.mailer.send({ to: user.email }, mail)

          log.debug(`Sent account creation notification mail to ${user.email}`)
        } catch (exc) {
          log.error(
            exc,
            `Failed to send account notification mail to ${user.email}`
          )
        }
      })
    )

    return mapAccount(account)
  }
)

export default createMutations(field => ({
  onboardingFinish: field.ofType(AccountType).resolve(onboardingFinish),
}))
