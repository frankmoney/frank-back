import KEY from './KEY'
import SqlLiteral from './SqlLiteral'

const literal = <T extends object>(
  text: string,
  target?: T
): T & SqlLiteral => {
  const sql = <SqlLiteral>{
    [KEY]: {
      type: 'literal',
      text,
    },
  }

  return <T & SqlLiteral>(
    Object.assign({ toString: () => text }, target || {}, sql)
  )
}

export default literal
