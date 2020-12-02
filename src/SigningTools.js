const fetch = require('node-fetch')
const ecc = require('eosjs-ecc')
const ChainNodeMap = require('./ChainNodeMap')

class SigningTools {
  static async getAccountInfo (chainId, account) {
    const node = ChainNodeMap[chainId]
    if (!node) {
      throw new Error(`No node found for chainId: ${chainId}`)
    }
    const {
      host,
      port
    } = node
    const accountInfo = await fetch(`https://${host}:${port}/v1/chain/get_account`, {
      method: 'post',
      body: JSON.stringify({ account_name: account }),
      headers: { 'Content-Type': 'application/json' }
    })
    return accountInfo.json()
  }

  static async getPublicKeys (chainId, account) {
    const { permissions } = await this.getAccountInfo(chainId, account)
    const pubKeys = []
    permissions.forEach(({ required_auth: { keys } }) => {
      keys.forEach(({ key }) => pubKeys.push(key))
    })
    return pubKeys
  }

  static async verifySignature ({
    chainId,
    account,
    signature,
    data
  }) {
    const pubKeys = await this.getPublicKeys(chainId, account)
    for (const pubKey of pubKeys) {
      if (ecc.verify(signature, data, pubKey)) {
        return true
      }
    }
    return false
  }
}

module.exports = SigningTools
