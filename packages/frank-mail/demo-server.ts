import express from 'express'
import AccountCreationNotification from './lib/accountCreationNotification'
import StoryPublicationNotification from './lib/storyPublicationNotification'
import AccountAggregationIssues from './lib/accountAggregationIssues'

const app = express()

const mails = {
  'AccountCreationNotification': AccountCreationNotification({
    data: {
      user: { firstName: 'Tom' },
      creator: { firstName: 'Nick' },
      account: { name: 'Frank Money Inc' },
      link: 'https://ya.ru',
    },
  }),
  'StoryPublicationNotification': StoryPublicationNotification({
    data: {
      user: { firstName: 'Tom' },
      creator: { firstName: 'Nick' },
      account: { name: 'Frank Money Inc' },
      story: {
        imageUrl: 'https://iso.500px.com/wp-content/uploads/2016/11/stock-photo-159533631-1500x1000.jpg',
        title: 'Breakwater reaches 500 backers. New reward levels are released',
        description: 'Greetings to our Awesome Backers!!! Since we launched our campaign we have been working on a new and exciting feature...',
        link: 'http://habr.com',
      },
    },
  }),
  'AccountAggregationIssues': AccountAggregationIssues({
    data: {
      user: { firstName: 'Tom' },
      account: { name: 'Frank Money Inc' },
      link: 'http://fb.com',
    }
  })
}

const keys = Object.keys(mails)

for (const key of keys) {
  app.get(`/${key}`, (req, res) => {
    res.send(mails[key].html)
  })
}

app.listen(3000, () => {
  console.log('Emails:')
  for (const key of keys) {
    console.log(`http://localhost:3000/${key}`)
  }
})
