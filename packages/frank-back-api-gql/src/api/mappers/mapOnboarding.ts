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
  .build()

export default mapOnboarding
