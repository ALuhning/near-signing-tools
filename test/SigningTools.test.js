/* eslint-disable no-undef */
import { signingTools } from '../src/SigningTools'

jest.setTimeout(20000)
describe('getAccountInfo', () => {
  test('getAccountInfo', async () => {
    const accountInfo = await signingTools.getAccountInfo(
      'testnet',
      'player1.testnet')
    expect(accountInfo.accountId).toEqual('player1.testnet')
  })
})

describe('getPublicKeys', () => {
  test('getPublicKeys', async () => {
    const pubKeys = await signingTools.getPublicKeys('player1.testnet')

    expect(pubKeys).toEqual([
      'ed25519:2FuChwaW9tN6LvocBUyfafLoGF3peiUj77iGD2MVPdes',
      'ed25519:A2pT3HQSPj3qP2E887DgH4wEW3UQGvM3kcEEmCPyhHLz',
      'ed25519:Dnb7PVqgVsa7dMcuaxdP4B7MqVaFAsDeaPMpwmqkArmp',
      'ed25519:GeTZ96JuftwENcprVVcKmXezyKeZkLjmcB93o4XmjqtZ',
      'ed25519:Gqd1xmAjrjy6k9M5N22qf8qXZ6YBUqFeTKPxK7UzGsEw'
    ])
  })

  test('getPublicKeys non existing account', async () => {
    const pubKeys = await signingTools.getPublicKeys('wierdlyno.testnet')

    expect(pubKeys).toEqual([])
  })
})

describe('verifySignature', () => {
  test('verifySignature', async () => {
    const response = await signingTools.verifySignature({
      chainId: 'testnet',
      account: 'player1.testnet',
      signature: 'HB7juMnj/z2JwkbhCcnFuZkX+RzR/4mbMn3KYdomjJNEqztOZyhhPW0OgmoF2lBzjMp6/G+0d23ETMOrsRiQCw==',
      data: 'the message I am signing with this key'

    })
    expect(response).toBe(true)
  })
})
