/* eslint-disable no-undef */
const SigningTools = require('../src/SigningTools')
const { EOSIOProvider } = require('@smontero/eosio-local-provider')

const eosioProvider = new EOSIOProvider({
  chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
  account: 'testuser1111',
  keys: {
    EOS6uUc8fYoCdyz7TUAXqHvRbU7QnVirFuvcAW6NMQqBabdME6FnL: '5KFFFvKioakMpt8zWnyGKnLaDzzUSqy5V33PHHoxEam47pLJmo2'
  }
})

jest.setTimeout(20000)

describe('getPublicKeys', () => {
  test('getPublicKeys', async () => {
    const pubKeys = await SigningTools.getPublicKeys(
      '1eaa0824707c8c16bd25145493bf062a',
      'sebastianmb1')

    expect(pubKeys).toEqual([
      'EOS6Hv6RbGqvyiL6gA63GzirDeTCEMKbPANL635jeWKvvWdgDzW2u',
      'EOS6Hv6RbGqvyiL6gA63GzirDeTCEMKbPANL635jeWKvvWdgDzW2u'
    ])
  })

  test('getPublicKeys non existing account', async () => {
    const pubKeys = await SigningTools.getPublicKeys(
      '1eaa0824707c8c16bd25145493bf062a',
      'nonexistingaccount')

    expect(pubKeys).toEqual([])
  })
})

describe('verifySignature', () => {
  test('verifySignature', async () => {
    let response = await SigningTools.verifySignature({
      chainId: '1eaa0824707c8c16bd25145493bf062a',
      account: 'sebastianmb1',
      signature: 'SIG_K1_KhjYaak5p8jcKbE91fruP4tZYdB4ePoEkjtzg8oXGr9mgvPaEKQgchayxmNYnacqzfHQVk54kaN4YoZCWNG6ExD37BeWPx',
      data: 'Message to sign'

    })
    expect(response).toBe(true)

    response = await SigningTools.verifySignature({
      chainId: '1eaa0824707c8c16bd25145493bf062a',
      account: 'sebastianmb1',
      signature: 'SIG_K1_KhjYaak5p8jcKbE91fruP4tZYdB4ePoEkjtzg8oXGr9mgvPaEKQgchayxmNYnacqzfHQVk54kaN4YoZCWNG6ExD37BeWPx',
      data: 'Message to sign1'

    })
    expect(response).toBe(false)

    const data = 'Create a new account link to your identity.\n\ndid:3:bafysdfwefwe'
    const signature = await eosioProvider.signArbitrary('EOS6uUc8fYoCdyz7TUAXqHvRbU7QnVirFuvcAW6NMQqBabdME6FnL', data)
    console.log(signature)
    response = await SigningTools.verifySignature({
      chainId: '1eaa0824707c8c16bd25145493bf062a',
      account: 'testuser1111',
      signature,
      data
    })
    expect(response).toBe(true)
  })
})
