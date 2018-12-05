import createMutations from 'utils/createMutations'
import createAccount from 'api/dal/Account/createAccount'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapAccount from 'api/mappers/mapAccount'
import { COMPLETED_STEP, TEAM_STEP } from 'api/onboarding/constants'
import AccountType from 'api/schema/AccountType'
import createCategories from 'api/dal/Category/createCategories'
import createSource from 'api/dal/Source/createSource'
import CategoryType from '../../types/CategoryType'
import createPrivateResolver from '../utils/createPrivateResolver'
import R from 'ramda'
import request from 'request'

const IMPORT_URL = process.env.IMPORT_URL
const IMPORT_DAYS_AGO = process.env.IMPORT_DAYS_AGO || 90

const onboardingFinish = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({ scope }) => {
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

    const source = await createSource(
      {
        accountId: account.id,
        name: existingOnboarding.account.name, // original name
        data: existingOnboarding.account,
        creatorId: scope.user.id,
      },
      scope
    )

    if (IMPORT_URL) {
      request.post(IMPORT_URL, {
        json: {
          sourceId: source.id,
          daysAgo: IMPORT_DAYS_AGO,
        },
      })
    }

    const spendingCategories = R.map(
      c => ({
        ...c,
        type: CategoryType.spending,
      }),
      existingOnboarding.categories.spending || []
    )

    const revenueCategories = R.map(
      c => ({
        ...c,
        type: CategoryType.revenue,
      }),
      existingOnboarding.categories.revenue || []
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

    return mapAccount(account)
  }
)

export default createMutations(field => ({
  onboardingFinish: field.ofType(AccountType).resolve(onboardingFinish),
}))
