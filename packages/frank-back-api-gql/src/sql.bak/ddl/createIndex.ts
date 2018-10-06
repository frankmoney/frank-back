import { TableName, TableNameValues, createTableName } from '../identifiers'
import TableNameKeys from '../identifiers/TableNameKeys'

const createIndex = {
  on<
    TValues extends TableNameValues,
    TKeys extends TableNameKeys<TValues>,
    TTableName extends TableName<TValues, TKeys>
  >(name: TTableName) {
    const add: TValues[] = []
    return {
      add<TKey extends TKeys, TValue extends TValues[TKey]>(column: TValue) {
        add.push(column)
        return this
      },
    }
  },
}

const test = createTableName('test', {
  id: 'id',
})

const test2 = createTableName('test', {
  id: 'id2',
  id3: 'id3',
})

createIndex.on(test).add(test2.id3)

export default createIndex
