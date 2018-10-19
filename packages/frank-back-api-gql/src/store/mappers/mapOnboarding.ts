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
  .build()

export default mapOnboarding
