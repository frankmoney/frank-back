import { literal, SqlLiteral } from '../ast'

const raw = (obj: any): SqlLiteral => literal(`${obj}`)

export default raw
