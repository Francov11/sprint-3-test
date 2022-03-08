const orders = require('../models/orders.model')
const products = require('../../products/models/products.model')
const payments = require('../../payments/models/payments.model')
const orderStates = require('../models/orderStatus.model')
const users = require('../../users/model/users')
const {getIdUser} = require('../../shared/shared')
const {getIdTest} = require('../../shared/shared')

const getPrice = async (req, res) => {
    try {
        const { order } = req.body
        console.log(order)
        let price = 0
        for (i = 0; i < order.length; i++) {
            const product = await products.findOne({ name: order[i].product })
            let productPrice = product.price
            let amount = order[i].amount
            console.log(amount)
            price += amount * productPrice
            
            order[i].productPrice = productPrice 
            console.log(price)
            return price
        }
        
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}

const validateConfirmation = async (req, res, next) => {
  try {
    const idUser = getIdTest
    const orderUser = await orders.findOne({ idUser: idUser, status: 'new' })
    !orderUser ? res.status(404).json({ msg: 'You do not have any new order to be confirmed', status: 404 }) : next()
  } catch (error){
      res.status(500).json({ error: error.message })
  }
}

const validateRequest = async (req, res, next) => {
  try {
    const { order, methodOfPayment } = req.body

    const idUser = getIdTest
    const orderUser = await orders.findOne({ idUser: idUser, state: 'new' })

    //if (!orderUser) return res.status(404).json({ msg: 'You already have a pending order, confirm the order to create another', status: 404 })
    //!orderUser ? res.status(404).json({ msg: 'You already have a pending order, confirm the order to create another', status: 404 }) : next()

    for (let i = 0; i < order.length; i++) {
      const productExist = await products.exists({ name: order[i].product })
      if (!productExist) return res.status(404).json({ msg: 'A product entered does not exist. Check the product list', status: 404 })
    }

    const paymentExist = await payments.exists({ method: methodOfPayment })
    !paymentExist ? res.status(404).json({ msg: 'The payment method does not exist. Check the methods of payments list', status: 404 }) : next()
  } catch {
    res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
  }
}

module.exports = {
  validateRequest,
  getPrice,
  validateConfirmation
}