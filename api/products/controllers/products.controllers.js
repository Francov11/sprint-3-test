const repositories = require('../repositories/products.repositories')

const getProducts = async (req, res) => {
    try {
        const products = await repositories.getAll()

        res.status(200).json({
            message: 'Productos obtenidos',
            product: products,
            status: 200
        })
    } catch (error) {
        console.log('hola')
        res.status(500).json({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body

        const newProduct = {
            name: name,
            price: price
        }
        const product = await repositories.createProduct(newProduct)

        res.status(200).json({
            message: 'Producto creado',
            product: product,
            status: 200
        })
    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, price, isVisible } = req.body
        
        const { idProduct } = req.params
        
        const product = {
            name: name,
            price: price,
            isVisible: isVisible
        }

        const filter = { _id: idProduct }

        await repositories.modifyProduct(filter, product)

        res.status(200).json({
            message: 'Producto editado',
            status: 200
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { idProduct } = req.params
        const filter = { _id: idProduct }

        await repositories.deleteProduct(filter)

        res.status(200).json({
            message: 'Producto eliminado',
            status: 200
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}

