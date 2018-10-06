import { createMigration } from '../migrator'
import { up, down } from './1538361675201_t_team'

export default createMigration({
  id: 1538361675201,
  name: 't_team',
  up,
  down,
})
