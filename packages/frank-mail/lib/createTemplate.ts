import { Template, TemplateArgs, TemplateBuilder } from './types'
import Layout from './Layout'
import { renderEmail } from 'react-html-email'

const createTemplate = <TData>(
  builder: TemplateBuilder<TData>,
): Template<TData> => {
  return (args: TemplateArgs<TData>) => {

    const { subject, body } = builder({
      data: args.data,
    })

    const html = renderEmail(Layout({ body }))

    return {
      subject,
      html,
    }
  }
}

export default createTemplate
