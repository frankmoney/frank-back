import ReactDOM from 'react-dom/server'
import { Template, TemplateArgs, TemplateBuilder } from './types'

const createTemplate = <TData>(
  builder: TemplateBuilder<TData>
): Template<TData> => {
  return (args: TemplateArgs<TData>) => {
    const { subject, body } = builder({
      data: args.data,
    })

    const bodyHtml = ReactDOM.renderToStaticMarkup(body)

    const html = `<!doctype html><html><body>${bodyHtml}</body></html>`

    return {
      subject,
      html,
    }
  }
}

export default createTemplate
