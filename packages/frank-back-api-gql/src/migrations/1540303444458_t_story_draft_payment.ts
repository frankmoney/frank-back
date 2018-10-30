import { MigrationContext } from './1540303444458_t_story_draft_payment.migration'
import {
  payment,
  storyDraft,
  storyDraftPayment,
} from './1540303444458_t_story_draft_payment.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(storyDraftPayment, true)
        .column(t => t.storyDraftId, 'bigint not null')
        .column(t => t.paymentId, 'bigint not null'),
    x =>
      x.alter
        .table(storyDraftPayment)
        .addForeignKey()
        .column(t => t.storyDraftId)
        .to(storyDraft)
        .column(t => t.id),
    x =>
      x.alter
        .table(storyDraftPayment)
        .addForeignKey()
        .column(t => t.paymentId)
        .to(payment)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(storyDraftPayment))
}
