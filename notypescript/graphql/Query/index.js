const { gqlObject } = require('../typeHelpers')
const accounts = require('./accounts')
const account = require('./account')
const team = require('./team')
const stories = require('./stories')

module.exports = gqlObject({
  name: 'Query',
  fields: {
    team,
    accounts,
    account,
    stories,
  },
})
