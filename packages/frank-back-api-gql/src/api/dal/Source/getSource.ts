import { sql, where } from 'sql'
import mapSource from 'store/mappers/mapSource'
import { source } from 'store/names'
import Source from 'store/types/Source'
import createQuery from '../createQuery'
import SourceWhere from './helpers/SourceWhere'
import sourceFieldsSql from './helpers/sourceFieldsSql'
import sourcePredicateSql from './helpers/sourcePredicateSql'

export type Args = {
  where?: SourceWhere
}

export default createQuery<Args, Source>('getSource', (args, { db }) =>
  db.first(
    sql`
      select ${sourceFieldsSql('s')}
      from "${source}" s
      ${where(sourcePredicateSql('s', args.where))}
      limit 1
    `,
    mapSource
  )
)
