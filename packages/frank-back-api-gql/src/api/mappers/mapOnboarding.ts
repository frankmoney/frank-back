import Target from 'api/types/Onboarding'
import Source from 'store/types/Onboarding'
import Mapper from './Mapper'
import map from './map'

const mapOnboarding: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('step', 'step')
  .for('institution', 'institution')
  .for('credentials', 'credentials')
  .for('mfa', 'mfa')
  .for('accounts', 'accounts')
  .for('account', 'account')
  .for('categories', 'categories')
  .for('team', 'team')
  .build()

export default mapOnboarding
