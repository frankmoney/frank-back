import AccountWhere from '../../Account/helpers/AccountWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'

export default interface StoryWhere {
  id?: WhereId
  pid?: WherePid
  account?: AccountWhere
  or?: StoryWhere | StoryWhere[]
  and?: StoryWhere | StoryWhere[]
}
