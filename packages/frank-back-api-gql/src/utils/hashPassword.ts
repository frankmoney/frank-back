import bcrypt from 'bcrypt'

const hashPassword = (password: string, salt: string) =>
  new Promise<string>((resolve, reject) => {
    bcrypt.hash(
      password,
      salt,
      (err, hash) => (err ? reject(err) : resolve(hash))
    )
  })

export default hashPassword
