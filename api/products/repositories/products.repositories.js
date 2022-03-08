const products = require('../models/products.model')

const getAll = async() => await products.find()

const createProduct = async(newProduct) => {
    const product = new products(newProduct)
    const response = await product.save()
    return response
}

const modifyProduct = async (filter, product) => await products.findOneAndUpdate(filter, product)

const deleteProduct = async (filter) => await products.findByIdAndDelete(filter)

module.exports = { 
    getAll,
    createProduct,
    modifyProduct,
    deleteProduct
}