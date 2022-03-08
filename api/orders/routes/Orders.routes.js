const express = require('express');
const router = express.Router();
const Middlewares = require('../middlewares/orders')
const Controllers = require('../controllers/orders')
const Shared = require('../../shared/shared')

router.post('/', Shared.isAuthenticated , Middlewares.validateRequest, Controllers.postOrder) //funciona todo menos el validateRequest

router.put('/UpdateOrder',Shared.isAuthenticated, Controllers.modifyOrder)// testear

router.put('/confirmOrder',Shared.isAuthenticated, Middlewares.validateConfirmation, Controllers.confirmOrder) //funciona

router.get('/getHistory',Shared.isAuthenticated, Controllers.getHistory)//funciona

router.get('/allOrders',Shared.isAuthenticated, Controllers.getHistory) //admin // testear

router.put('/UpdasteStatus',Shared.isAuthenticated, Controllers.getHistory) //admin // testear

 
module.exports = router