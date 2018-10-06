import escapeStringRegexp from 'escape-string-regexp'

const escapeRx = (str: string) => escapeStringRegexp(str)

export default escapeRx
