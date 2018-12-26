import express from 'express'
import AccountCreationNotification from './lib/accountCreationNotification'

const app = express()

app.get('/', (req, res) => {

  const accountNotification = AccountCreationNotification({
    data: {
      user: { firstName: 'Tom' },
      creator: { firstName: 'Nick' },
      accountName: 'Frank Money Inc',
      link: 'https://ya.ru',
    },
  })

  res.send(accountNotification.html)
})

app.listen(3000, () => {
  console.log('Demo listening on http://localhost:3000 ')
})
