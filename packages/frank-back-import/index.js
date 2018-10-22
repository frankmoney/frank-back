import Account from './model/account'
import handleAccount from './handleAccount'

const main = async () => {

  const accounts = await Account.findAll()

  for (const account of accounts) {

    await handleAccount(account, 60)
  }
}

main()
