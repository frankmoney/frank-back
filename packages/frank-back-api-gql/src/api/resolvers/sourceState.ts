import humps from 'humps'
import {
  CONNECTED_MXSTATUS,
  DENIED_MXSTATUS,
  PREVENTED_MXSTATUS,
  IMPAIRED_MXSTATUS,
  REJECTED_MXSTATUS,
  EXPIRED_MXSTATUS,
  CHALLENGED_MXSTATUS,
  UPDATED_MXSTATUS,
  RESUMED_MXSTATUS,
  CREATED_MXSTATUS,
  IMPEDED_MXSTATUS,
  LOCKED_MXSTATUS,
} from 'api/onboarding/constants'
import {
  NEED_CREDENTIALS_STATUS,
  NEED_MFA_STATUS,
  NORMAL_STATUS,
  CHECKING_STATUS,
  LOCKED_STATUS,
  FAILED_STATUS,
} from 'api/schema/SourceStateType'
import OnboardingScope from 'api/onboarding/OnboardingScope'
import { SourceStatus } from 'store/enums'
import updateSource from 'api/dal/Source/updateSource'
import createPrivateResolver from './utils/createPrivateResolver'
import getSource from 'api/dal/Source/getSource'

type SourceStateType = {
  status: string
  credentials?: any[]
  challenges?: any[]
}

type Handler = (
  memberGuids: { userGuid: string; memberGuid: string },
  scope: OnboardingScope
) => Promise<SourceStateType>

const HANDLERS: {
  mxStatuses: string[]
  handler: Handler
}[] = [
  {
    mxStatuses: [CONNECTED_MXSTATUS],
    handler: async () => ({ status: NORMAL_STATUS }),
  },
  {
    mxStatuses: [RESUMED_MXSTATUS, UPDATED_MXSTATUS, CREATED_MXSTATUS],
    handler: async () => ({ status: CHECKING_STATUS }),
  },
  {
    mxStatuses: [IMPEDED_MXSTATUS, LOCKED_MXSTATUS],
    handler: async () => ({ status: LOCKED_STATUS }),
  },
  {
    mxStatuses: [DENIED_MXSTATUS, PREVENTED_MXSTATUS, IMPAIRED_MXSTATUS],
    handler: async (memberGuids, scope) => {
      const { credentials } = await scope.mx.listMemberCredentials(memberGuids)

      return {
        status: NEED_CREDENTIALS_STATUS,
        credentials: credentials.map(o => humps.camelizeKeys(o)),
      }
    },
  },
  {
    mxStatuses: [REJECTED_MXSTATUS, EXPIRED_MXSTATUS, CHALLENGED_MXSTATUS],
    handler: async (memberGuids, scope) => {
      const { challenges } = await scope.mx.listMemberChallenges(memberGuids)

      return {
        status: NEED_MFA_STATUS,
        challenges: challenges.map(o => humps.camelizeKeys(o)),
      }
    },
  },
]

export default createPrivateResolver(
  'sourceState',
  async ({ args: { sourcePid }, scope }) => {
    const source = await getSource(
      {
        where: {
          pid: { eq: sourcePid },
        },
      },
      scope
    )

    const { userGuid, memberGuid } = source.data

    const memberGuids = { userGuid, memberGuid }

    const {
      member: { connection_status: connectionStatus },
    } = await scope.mx.readMember(memberGuids)

    if (connectionStatus === CONNECTED_MXSTATUS && source.status !== SourceStatus.active) {

      await updateSource(
        {
          userId: scope.user.id,
          update: { status: SourceStatus.active },
          where: { pid: { eq: sourcePid } },
        },
        scope
      )
    }

    for (const { mxStatuses, handler } of HANDLERS) {
      if (mxStatuses.includes(connectionStatus)) {
        return await handler(memberGuids, scope)
      }
    }

    return {
      status: FAILED_STATUS,
    }
  }
)
