import { Template, TemplateArgs, TemplateBuilder } from './types'
import Layout from './components/Layout'
import { renderEmail } from 'react-html-email'

const createTemplate = <TData>(
  builder: TemplateBuilder<TData>,
): Template<TData> => {
  return (args: TemplateArgs<TData>) => {

    const { subject, body, logoAlign } = builder({
      data: args.data,
    })

    const html = renderEmail(Layout({ body, logoAlign }))

    return {
      subject,
      html,
    }
  }
}

export default createTemplate
