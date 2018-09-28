import { createMigration } from '../migrator'
import { up, down } from './1538108727219_t_team'

export default createMigration({
  id: 1538108727219,
  name: 't_team',
  up,
  down,
})
