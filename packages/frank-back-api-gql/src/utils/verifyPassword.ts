import hash from 'password-hash'

const verifyPassword = (password: string, passwordHash: string): boolean =>
  hash.verify(password, passwordHash)

export default verifyPassword
