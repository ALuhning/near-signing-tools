import nacl from 'tweetnacl'
import * as nearAPI from 'near-api-js'
const { NearProvider } = require('near-web3-provider')
const axios = require('axios').default
const util = require('util')

class SigningTools {
  /**
  * @param {string} chainId
  * @param {string} account
  * @returns {Object} with account info
  */
  async getAccountInfo (chainId, account) {
    const nearProvider = new NearProvider({
      networkId: chainId,
      masterAccountId: account,
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    })
    const accountInfo = nearProvider.account
    return accountInfo
  }

  /**
  * @param {string} chainId
  * @param {string} account
  * @returns {Array} with accounts public keys
  */
  async getPublicKeys (account) {
    const body = {
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'query',
      params: {
        request_type: 'view_access_key_list',
        finality: 'final',
        account_id: account
      }
    }

    const response = await axios.post('https://rpc.testnet.near.org', body)
    console.log(response)
    const pubKeys = []
    response.data.result.keys.forEach(key => {
      if (key.access_key.permission) {
        console.log('key', key)
        pubKeys.push(key.public_key)
      }
    })
    return pubKeys
  }

  str2ab (text) {
    return new util.TextEncoder().encode(text)
  }

  /**
  * @param {string} chainId
  * @param {string} account
  * @param {string} signature
  * @param {string} data
  * @returns {boolean} whether verfication was succesful
  */
  async verifySignature ({
    chainId,
    account,
    signature,
    data
  }) {
    const pubKeys = await this.getPublicKeys(account)
    console.log('pubKeys', pubKeys)

    const sigprep = Buffer.from(signature, 'base64')
    const sigFinal = Uint8Array.from(sigprep)
    console.log('sigPrep', sigFinal)

    const msgPrep = this.str2ab(data)
    const msgFinal = Uint8Array.from(msgPrep)
    console.log('msgPrep', msgFinal)

    for (const pubKey of pubKeys) {
      console.log('pubKey', pubKey)
      const pubkeyprep = nearAPI.utils.PublicKey.from(pubKey)
      const pubKeyFinal = Uint8Array.from(pubkeyprep.data)
      if (nacl.sign.detached.verify(msgFinal, sigFinal, pubKeyFinal)) {
        return true
      }
    }
    return false
  }
}

export const signingTools = new SigningTools()
