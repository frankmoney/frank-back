import { Context } from 'app/Context'
import assertAccountAccess from './accountAccess'

// tslint:disable-next-line:interface-name
export interface ContextAssert {
  accountAccess(accountId: string): Promise<void>
}

export const createContextAssert = (context: Context): ContextAssert => ({
  accountAccess(accountId: string) {
    return assertAccountAccess(
      (context.user && context.user.id) || '',
      accountId,
      context.prisma
    )
  },
})
