import { MigrationContext } from './1540303311070_t_story_payment.migration'
import {
  payment,
  story,
  storyPayment,
} from './1540303311070_t_story_payment.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(storyPayment, true)
        .column(t => t.storyId, 'bigint not null')
        .column(t => t.paymentId, 'bigint not null'),
    x =>
      x.create
        .foreignKey()
        .on(storyPayment)
        .column(t => t.storyId)
        .referencing(story)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(storyPayment)
        .column(t => t.paymentId)
        .referencing(payment)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(storyPayment))
}
