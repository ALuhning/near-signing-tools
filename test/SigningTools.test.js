/* eslint-disable no-undef */
const SigningTools = require('../src/SigningTools')

jest.setTimeout(20000)

describe('getPublicKeys', () => {
  test('getPublicKeys', async () => {
    const pubKeys = await SigningTools.getPublicKeys(
      '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
      'sebastianmb1')
    console.log('Public keys: ', pubKeys)

    expect(pubKeys).toEqual([
      'EOS6Hv6RbGqvyiL6gA63GzirDeTCEMKbPANL635jeWKvvWdgDzW2u',
      'EOS6Hv6RbGqvyiL6gA63GzirDeTCEMKbPANL635jeWKvvWdgDzW2u'
    ])
  })
})

describe('verifySignature', () => {
  test('verifySignature', async () => {
    let response = await SigningTools.verifySignature({
      chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
      account: 'sebastianmb1',
      signature: 'SIG_K1_KhjYaak5p8jcKbE91fruP4tZYdB4ePoEkjtzg8oXGr9mgvPaEKQgchayxmNYnacqzfHQVk54kaN4YoZCWNG6ExD37BeWPx',
      data: 'Message to sign'

    })
    expect(response).toBe(true)

    response = await SigningTools.verifySignature({
      chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
      account: 'sebastianmb1',
      signature: 'SIG_K1_KhjYaak5p8jcKbE91fruP4tZYdB4ePoEkjtzg8oXGr9mgvPaEKQgchayxmNYnacqzfHQVk54kaN4YoZCWNG6ExD37BeWPx',
      data: 'Message to sign1'

    })
    expect(response).toBe(false)
  })
})
