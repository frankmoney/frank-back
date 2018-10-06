import { createMigration } from '../migrator'
import { up, down } from './1538361838269_t_team_member'

export default createMigration({
  id: 1538361838269,
  name: 't_team_member',
  up,
  down,
})
