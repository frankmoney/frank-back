import bcrypt from 'bcrypt'

const createPasswordSalt = () =>
  new Promise<string>((resolve, reject) =>
    bcrypt.genSalt((err, salt) => (err ? reject(err) : resolve(salt)))
  )

export default createPasswordSalt
