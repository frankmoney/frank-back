import { onboarding } from '../names'
import Onboarding from '../types/Onboarding'
import Mapper from './Mapper'
import map from './map'

const mapOnboarding: Mapper<Onboarding> = map<Onboarding>()
  .from(onboarding)
  .extend()
  .for('step', x => x.step)
  .for('institution', x => x.institution)
  .for('credentials', x => x.credentials)
  .for('mfa', x => x.mfa)
  .for('accounts', x => x.accounts)
  .for('account', x => x.account)
  .for('categories', x => x.categories)
  .for('team', x => x.team)
  .for('mxMemberId', x => x.mxMemberId)
  .for('sourceId', x => x.sourceId)
  .build()

export default mapOnboarding
