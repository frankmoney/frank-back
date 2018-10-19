import { throwArgumentError } from 'api/errors/ArgumentError'
import { COMPLETED_STEP, TEAM_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import normalizeString from 'utils/normalizeString'
import createAccount from 'api/dal/Account/createAccount'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import mapAccount from 'api/mappers/mapAccount'
import AccountType from 'api/schema/AccountType'

const onboardingFinish = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({ scope }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== TEAM_STEP) {
      return throwArgumentError()
    }

    const categories = existingOnboarding.categories.map((category: any) => ({
      ...category,
      nameNormalized: normalizeString(category.name),
    }))

    const name =
      existingOnboarding.account.frankTitle || existingOnboarding.account.name

    const team = await getTeamByUserId({ userId: scope.user.id }, scope)

    const account = await createAccount({
      teamId: team.id,
      name,
      data: existingOnboarding.account,
    }, scope)

    await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      step: COMPLETED_STEP,
    }, scope)

    return mapAccount(account)
  },
)

export default createMutations(field => ({
  onboardingFinish: field.ofType(AccountType).resolve(onboardingFinish),
}))
