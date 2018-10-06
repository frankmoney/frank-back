import Name from './Name'
import TableNameKeys from './TableNameKeys'
import TableNameValues from './TableNameValues'

type TableName<
  TValues extends TableNameValues,
  TKeys extends TableNameKeys<TValues>
> = Name & TValues

export default TableName
