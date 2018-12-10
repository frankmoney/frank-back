import FieldArgumentBuilder from 'gql/nodes/FieldArgumentBuilder'

const peersDefaultFilters = (arg: FieldArgumentBuilder) => ({
  donors: arg.ofBool().nullable(),
  recipients: arg.ofBool().nullable(),
  search: arg.ofString().nullable(),
})

export default peersDefaultFilters
