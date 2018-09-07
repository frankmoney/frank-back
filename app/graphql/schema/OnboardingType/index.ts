import { Type } from 'gql'

export const CREDENTIALS_STEP = 'credentials'
export const COMPLETED_STEP = 'completed'
export const AWAITING_INPUT_STATUS = 'awaiting_input'

export const MX_TEMP_USER = 'USR-5a980496-bcec-5a05-436e-fb81ab7c8677'

export default Type('Onboarding', type =>
  type.fields(field => ({
    step: field.ofString(),
    institution: field.ofJson(),
    credentials: field.ofJson(),
    accounts: field.ofJson(),
    account: field.ofJson(),
  })),
)

export const findExistedOnboarding = async (userId: any, query: any) => {

  return (await query.onboardings({
    where: {
      AND: [
        { step_not: COMPLETED_STEP },
        { user: { id: userId } },
      ],
    },
  }))[0]
}
