import { Sql, and, or, sql } from 'sql'
import Where from './Where'

type Handler = (expression: Sql, value: any) => undefined | Sql

type Handlers = { [K in keyof Where<any>]?: Handler } & {
  [key: string]: Handler
}

const defaultHandlers: Handlers = {
  isNull: expression => sql`${expression} is null`,
  isNotNull: expression => sql`${expression} is not null`,
  eq: (expression, value) => sql`${expression} = ${value}`,
  gt: (expression, value) => sql`${expression} > ${value}`,
  lt: (expression, value) => sql`${expression} < ${value}`,
  gte: (expression, value) => sql`${expression} >= ${value}`,
  lte: (expression, value) => sql`${expression} <= ${value}`,
  startsWith: (expression, value) => {
    if (Array.isArray(value)) {
      const [substring, cs] = value
      const pattern = `${substring}%`
      return cs
        ? sql`${expression} like ${pattern}`
        : sql`${expression} ilike ${pattern}`
    } else {
      const pattern = `${value}%`
      return sql`${expression} ilike ${pattern}`
    }
  },
  endsWith: (expression, value) => {
    if (Array.isArray(value)) {
      const [substring, cs] = value
      const pattern = `%${substring}`
      return cs
        ? sql`${expression} like ${pattern}`
        : sql`${expression} ilike ${pattern}`
    } else {
      const pattern = `%${value}`
      return sql`${expression} ilike ${pattern}`
    }
  },
  contains: (expression, value) => {
    if (Array.isArray(value)) {
      const [substring, cs] = value
      const pattern = `%${substring}%`
      return cs
        ? sql`${expression} like ${pattern}`
        : sql`${expression} ilike ${pattern}`
    } else {
      const pattern = `%${value}%`
      return sql`${expression} ilike ${pattern}`
    }
  },
  ilike: (expression, value) => sql`${expression} ilike ${value}`,
  like: (expression, value) => sql`${expression} like ${value}`,
}

const defaultPredicateNames = [
  'eq',
  'gt',
  'lt',
  'gte',
  'lte',
  'startsWith',
  'endsWith',
  'contains',
  'ilike',
  'like',
  'isNull',
  'isNotNull',
]

const createWhereSql = <T>(
  expression: Sql,
  predicate: undefined | Where<T>,
  handlers?: Handlers
): undefined | Sql => {
  if (!predicate) {
    return undefined
  }

  const branches: (undefined | Sql)[] = []

  const effectiveHandlers = { ...defaultHandlers, ...handlers }

  const handle = (predicateName: keyof typeof effectiveHandlers) => {
    const condition = predicate[predicateName]
    if (condition) {
      const handler = effectiveHandlers[predicateName]!
      if (handler) {
        const branch = handler(expression, condition)
        branches.push(branch)
      }
    }
  }

  for (const predicateName of defaultPredicateNames) {
    handle(<keyof typeof effectiveHandlers>predicateName)
  }

  for (const key of Object.keys(predicate)) {
    if (
      key !== 'or' &&
      key !== 'and' &&
      defaultPredicateNames.indexOf(key) < 0
    ) {
      handle(<keyof typeof effectiveHandlers>key)
    }
  }

  if (predicate.and) {
    if (Array.isArray(predicate.and)) {
      branches.push(
        ...predicate.and.map(x => createWhereSql(expression, x, handlers))
      )
    } else {
      branches.push(createWhereSql(expression, predicate.and))
    }
  }

  const conjunction = and(branches)

  if (predicate.or) {
    if (Array.isArray(predicate.or)) {
      return or(
        conjunction,
        ...predicate.or.map(x => createWhereSql(expression, x, handlers))
      )
    } else {
      return or(conjunction, createWhereSql(expression, predicate.or))
    }
  } else {
    return conjunction
  }
}

export default createWhereSql
