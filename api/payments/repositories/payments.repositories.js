const payments = require('../models/payments.model')

const getAll = async() => await payments.find()

const createMethod = async(newMethod) => {
    const method = new payments(newMethod)
    const response = await method.save()
    return response
}

const modifyMethod = async (filter, method) => await payments.findOneAndUpdate(filter, method)

const deleteMethod = async (filter) => await payments.findByIdAndDelete(filter)

module.exports = { 
    getAll,
    createMethod,
    modifyMethod,
    deleteMethod
}