import assert from 'assert'
import handleNewPayment from '../handleNewPayment'
import FAKE_PAYMENTS from './fakePayments'

const IMPORT_USER_ID = 123

describe('handleNewPayment', () => {

  it('nothing', () => {

    const result = handleNewPayment({
        originalDescription: 'random',
        amount: 30.10,
        type: 'DEBIT', //DEBIT
        description: 'random peer name',
        date: '2018-12-01',
      },
      FAKE_PAYMENTS,
      IMPORT_USER_ID,
    )

    assert.strictEqual(result.descriptionUpdaterId, undefined)
    assert.strictEqual(result.peerUpdaterId, undefined)
    assert.strictEqual(result.categoryUpdaterId, undefined)

    assert.strictEqual(result.postedOn, '2018-12-01')
    assert.strictEqual(result.peerName, 'random peer name')
    assert.strictEqual(result.amount, -30.10)

    assert.strictEqual(result.peerId, undefined)
    assert.strictEqual(result.categoryId, undefined)
    assert.strictEqual(result.description, undefined)
  })

  it('firstMatcher', () => {

    const result = handleNewPayment({
        originalDescription: 'super originalDescription',
        amount: 20.2,
        type: 'CREDIT', //DEBIT
        description: 'peer name',
        date: '2018-01-01',
      },
      FAKE_PAYMENTS,
      IMPORT_USER_ID,
    )


    assert.strictEqual(result.descriptionUpdaterId, IMPORT_USER_ID)
    assert.strictEqual(result.peerUpdaterId, IMPORT_USER_ID)
    assert.strictEqual(result.categoryUpdaterId, IMPORT_USER_ID)

    assert.strictEqual(result.postedOn, '2018-01-01')
    assert.strictEqual(result.peerName, 'peer name')
    assert.strictEqual(result.amount, 20.2)


    assert.strictEqual(result.peerId, 2)
    assert.strictEqual(result.categoryId, 22)
    assert.strictEqual(result.description, 'super payment description')
  })

  it('secondMatcher', () => {

    const result = handleNewPayment({
        originalDescription: 'similar originalDescriptio',
        amount: 50.5,
        type: 'CREDIT',
      },
      FAKE_PAYMENTS,
      IMPORT_USER_ID,
    )

    assert.strictEqual(result.descriptionUpdaterId, IMPORT_USER_ID)
    assert.strictEqual(result.peerUpdaterId, IMPORT_USER_ID)
    assert.strictEqual(result.categoryUpdaterId, IMPORT_USER_ID)

    assert.strictEqual(result.peerId, 7)
    assert.strictEqual(result.categoryId, 77)
    assert.strictEqual(result.description, 'similar payment description')
  })

  it('thirdMatcher', () => {

    const result = handleNewPayment({
        originalDescription: 'similar originalDescriptio',
        amount: 10000.5,
        type: 'DEBIT',
      },
      FAKE_PAYMENTS,
      IMPORT_USER_ID,
    )

    assert.strictEqual(result.descriptionUpdaterId, IMPORT_USER_ID)
    assert.strictEqual(result.peerUpdaterId, IMPORT_USER_ID)
    assert.strictEqual(result.categoryUpdaterId, IMPORT_USER_ID)

    assert.strictEqual(result.peerId, 12)
    assert.strictEqual(result.categoryId, 1212)
    assert.strictEqual(result.description, 'similar payment description')
  })

})
