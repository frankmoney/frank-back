import { Context } from 'app/Context'
import assertAccountAccess from './accountAccess'
import assertCanUpdateTeamMemberRole from './canUpdateTeamMemberRole'
import assertPeerAccess from './peerAccess'

// tslint:disable-next-line:interface-name
export interface ContextAssert {
  accountAccess(accountId: string): Promise<void>
  canUpdateTeamMemberRole(teamMemberUserId: string): Promise<void>
  peerAccess(peerId: string): Promise<void>
}

export const createContextAssert = (context: Context): ContextAssert => ({
  accountAccess(accountId: string) {
    return assertAccountAccess(
      (context.user && context.user.id) || '',
      accountId,
      context.prisma
    )
  },
  canUpdateTeamMemberRole(teamMemberUserId: string) {
    return assertCanUpdateTeamMemberRole(
      (context.user && context.user.id) || '',
      teamMemberUserId,
      context.prisma
    )
  },
  peerAccess(peerId: string) {
    return assertPeerAccess(
      (context.user && context.user.id) || '',
      peerId,
      context.prisma
    )
  },
})
