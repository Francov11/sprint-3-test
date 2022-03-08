const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/payments.controllers')
const Middlewares = require('../middlewares/middlewares')
const Shared = require('../../shared/shared')

router.get('/', Shared.isAuthenticated, Shared.isAdmin, Controllers.getPayments)

router.post('/', Shared.isAuthenticated, Shared.isAdmin, Middlewares.validateMethod, Controllers.createPayment)

router.put('/:idPayment', Shared.isAuthenticated, Shared.isAdmin, Middlewares.validateMethodID, Middlewares.validateMethod, Controllers.updatePayment)

router.delete('/:idPayment', Shared.isAuthenticated, Shared.isAdmin, Middlewares.validateMethodID, Controllers.deletePayment)

module.exports = router