import { Input } from 'gql'

const StoryUpdateUpdateInput = Input('StoryUpdateUpdate', type =>
  type.fields(field => ({
    title: field.ofString().nullable(),
    cover: field.ofJson().nullable(),
    body: field.ofJson().nullable(),
    published: field.ofBool().nullable(),
    paymentPids: field.listOfId().nullable(),
  }))
)

export default StoryUpdateUpdateInput
