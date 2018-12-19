import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { ACCOUNT_STEP, SPENDING_CATEGORIES_STEP } from 'api/onboarding/constants'
import createSource from 'api/dal/Source/createSource'
import createOnboardingMutation from './helpers/createOnboardingMutation'
import request from 'request'

const IMPORT_URL = process.env.IMPORT_URL
const IMPORT_DAYS_AGO = process.env.IMPORT_DAYS_AGO || 180

export default createOnboardingMutation({
  name: 'CompleteAccountInfo',
  step: ACCOUNT_STEP,
  mutationArgs: arg => ({}),
  resolver: async (existingOnboarding, args, scope) => {

    const source = await createSource(
      {
        name: existingOnboarding.account.name, // original name
        data: {
          ...existingOnboarding.account,
          bankName: existingOnboarding.institution.name,
          bankLogo: existingOnboarding.institution.mediumLogoUrl,
        },
        creatorId: scope.user!.id,
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

    return await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        step: SPENDING_CATEGORIES_STEP,
        sourceId: source.id
      },
      scope
    )
  },
})
