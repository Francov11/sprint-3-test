const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/products.controllers')
const Middlewares = require('../middlewares/middlewares')
const Shared = require('../../shared/shared')

router.get('/', Shared.isAuthenticated, Shared.isAdmin, Controllers.getProducts)

router.post('/add', Shared.isAuthenticated, Shared.isAdmin, Middlewares.validateProduct, Controllers.createProduct)

router.put('/:idProduct', Shared.isAuthenticated, Shared.isAdmin, Middlewares.validateProductIdTest, Middlewares.validateProduct, Controllers.updateProduct)

router.delete('/:idProduct', Shared.isAuthenticated, Shared.isAdmin, Middlewares.validateProductIdTest, Controllers.deleteProduct)

module.exports = router