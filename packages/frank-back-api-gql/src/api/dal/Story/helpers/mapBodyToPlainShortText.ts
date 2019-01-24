import { convertFromRaw } from 'draft-js'

export default (
  body: any | null,
  wordsCount: number = 20
): string | undefined => {
  if (body && body.draftjs) {
    return (
      convertFromRaw(JSON.parse(body.draftjs))
        .getPlainText()
        .trim()
        .split(/\s+/)
        .slice(0, wordsCount)
        .join(' ') + '...'
    )
  }
}
