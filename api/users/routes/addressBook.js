const express = require('express')
const router = express.Router()
const Shared = require('../../shared/shared')
const controllers = require ('../controllers/addressBook')

router.get('/', Shared.isAuthenticated, controllers.listAddressBook);

router.post('/',  controllers.addAddress);

router.delete('/:id', Shared.isAuthenticated, controllers.deleteAddress)

module.exports = router;