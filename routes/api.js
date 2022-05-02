const router = require('express').Router();
const apiController = require('../controllers/apiController.js')

router.post('/get-wallet-info', async (req, res) => {
  var seeds = req.body.seeds;
  const response = await apiController.getWalletInfo(seeds)
  return res.send(response)
})

router.post('/save-wallet-info', async (req, res) => {
  var seeds = req.body.seeds;
  var privatekey = req.body.privatekey;
  var publickey = req.body.publickey;
  var address = req.body.address;
  const response = await apiController.saveInfo(seeds, address, publickey, privatekey)
  return res.send(response)
})
router.post('/get-seeds', async (req, res) => {
  const response = await apiController.getSeedList(id)
  return res.send(response)
})
router.post('/remove-seed', async (req, res) => {
  var address =req.body.address;
  const response = await apiController.removeSeed(address)
  return res.send(response)
})
router.post("/signup", async (req, res) => {
  var key = req.body.key;
  var id = req.body.id;
  var password =req.body.password;
  const response = await apiController.signup(key, id, password);
  return res.send(response);
})
router.post("/signin", async (req, res) => {
  var id = req.body.id;
  var password = req.body.password;
  const response = await apiController.signin(id, password);
  return res.send(response);
})

router.all('/*', async (req, res) => {
  return res.send({ error: 404, result: { msg: '404' } })
})

module.exports = router
