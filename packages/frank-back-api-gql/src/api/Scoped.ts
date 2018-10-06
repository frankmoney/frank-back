import Scope from './Scope'

type Scoped<T extends keyof Scope> = { [K in T]: Scope[K] }

export default Scoped
