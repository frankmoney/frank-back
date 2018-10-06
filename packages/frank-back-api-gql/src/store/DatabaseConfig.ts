import { PoolConfig } from 'pg'

type DatabaseConfig = PoolConfig & { setRole?: string }

export default DatabaseConfig
