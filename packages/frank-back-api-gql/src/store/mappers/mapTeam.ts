import { team } from '../names'
import Team from '../types/Team'
import Mapper from './Mapper'
import map from './map'

const mapTeam: Mapper<Team> = map<Team>()
  .from(team)
  .extend()
  .for('name', x => x.name)
  .build()

export default mapTeam
