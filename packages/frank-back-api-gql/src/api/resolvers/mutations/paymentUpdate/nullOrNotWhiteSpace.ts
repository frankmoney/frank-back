import R from 'ramda'

const nullOrNotWhiteSpace = (s: string | undefined | null) => {
  if (R.isNil(s)) {
    return s
  }

  s = s.trim()

  return R.isEmpty(s) ? null : s
}

export default nullOrNotWhiteSpace
