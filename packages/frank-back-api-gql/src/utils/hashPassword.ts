import hash from 'password-hash'

const hashPassword = (password: string) => hash.generate(password)

export default hashPassword
