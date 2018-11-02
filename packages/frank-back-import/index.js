import Account from './model/account'
import handleAccount from './handleAccount'

const main = async () => {

  const accounts = await Account.findAll()
  // const accounts = await Account.findAll({where: {id: 3}})

  for (const account of accounts) {

    await handleAccount(account, 60)
  }

  process.exit()
}

main()
