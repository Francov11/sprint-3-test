const { updateStatus } = require('../controllers/orders')
const orders = require('../models/orders.model')

const allOrders = async() => await orders.find()

const getHistory = async (filter) => await orders.find({ filter })//idUser: idUser

const postOrder = async(newOrder) => {
    const order = new orders(newOrder)
    const response = await order.save()
    return response
}

const confirmOrder = async (filter, update) => await orders.findOneAndUpdate(filter, update)

const updateOrder = async (filter, order) => await orders.findOneAndUpdate(filter, update)

const stateOrder = async (filter, status) => await orders.findOneAndUpdate(filter, order)

module.exports = {
    getHistory,
    postOrder,
    updateOrder,
    confirmOrder,
    allOrders,
    stateOrder
}