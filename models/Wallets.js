const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Wallet_Schema = new Schema({
  seeds: { type: String, default: '' },
  address: { type: String, default: '' },
  publickey: { type: String, default: '' },
  privatekey: { type: String, default: '' },
  registion : {type:Number, default:0}
})

const WalletModal = mongoose.model('Walletdata', Wallet_Schema)
module.exports = { WalletModal }
