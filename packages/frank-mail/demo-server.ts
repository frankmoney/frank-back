import express from 'express'
import AccountCreationNotification from './lib/accountCreationNotification'
import StoryPublicationNotification from './lib/storyPublicationNotification'

const app = express()

app.get('/AccountCreationNotification', (req, res) => {

  const accountCreationNotification = AccountCreationNotification({
    data: {
      user: { firstName: 'Tom' },
      creator: { firstName: 'Nick' },
      accountName: 'Frank Money Inc',
      link: 'https://ya.ru',
    },
  })

  res.send(accountCreationNotification.html)
})

app.get('/StoryPublicationNotification', (req, res) => {

  const storyPublicationNotification = StoryPublicationNotification({
    data: {
      user: { firstName: 'Tom' },
      creator: { firstName: 'Nick' },
      accountName: 'Frank Money Inc',
      story: {
        imageUrl: 'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg',
        title: 'Breakwater reaches 500 backers. New reward levels are released',
        description: 'Greetings to our Awesome Backers!!! Since we launched our campaign we have been working on a new and exciting feature...',
        link: 'http://habr.com',
      },
    },
  })

  res.send(storyPublicationNotification.html)
})

app.listen(3000, () => {
  console.log('Emails:')
  console.log('http://localhost:3000/accountCreationNotification')
  console.log('http://localhost:3000/storyPublicationNotification')
})
