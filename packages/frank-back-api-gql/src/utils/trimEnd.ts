import escapeRx from './escapeRx'

const trimEnd = (str: string, chars: string): string => {
  // don't use `[${escapeRx(chars)}]` b/c escaping works improperly inside `[]`
  const charArray = Array.prototype.slice.call(chars, 0)
  const escapedCharArray = charArray.map(escapeRx)
  const rx = new RegExp(`(${escapedCharArray.join('|')})+$`)
  return str.replace(rx, '')
}

export default trimEnd
