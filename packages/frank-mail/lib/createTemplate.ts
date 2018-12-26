import ReactDOM from 'react-dom/server'
import { Template, TemplateArgs, TemplateBuilder } from './types'
import {MAIN_STYLE, CARD_WIDTH, LOGO_URL, LOGO_WIDTH} from './styles'
import Footer from './Footer'

const createTemplate = <TData>(
  builder: TemplateBuilder<TData>,
): Template<TData> => {
  return (args: TemplateArgs<TData>) => {
    const { subject, body } = builder({
      data: args.data,
    })

    const bodyHtml = ReactDOM.renderToStaticMarkup(body)

    const footerHtml = ReactDOM.renderToStaticMarkup(Footer())

    const html = `
<!doctype html>
<html>
  <head>
    <style>${MAIN_STYLE}</style>
  </head>
  <body>
  <center>
  <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
    <tr>
    <td align="center" valign="top" id="cardCell">
      <table border="0" cellpadding="0" cellspacing="0" width="${CARD_WIDTH}" id="cardBody">
        <tr>
        <td align="center" valign="top">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="${CARD_WIDTH}">
                <tr>
                <td align="center" valign="top" width="${CARD_WIDTH}">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td valign="top" id="cardContainer">
                        <div id="cardHedaer">
                           <img src="${LOGO_URL}" width="${LOGO_WIDTH}" alt="Frank logo"/>
                        </div>
                        <div id="cardContent">
                          ${bodyHtml}
                        </div>
                        ${footerHtml}
                      </td>
                    </tr>
                  </table>
                </td>
                </tr>
              </table>
            </td>
            </tr>
          </table>
        </td>
        </tr>
      </table>
    </td>
    </tr>
</table>
</center>
</body>
</html>
`

    return {
      subject,
      html,
    }
  }
}

export default createTemplate
