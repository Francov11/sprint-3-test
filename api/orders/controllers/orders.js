const repositories = require('../repositories/orders')
const {getPrice} = require('../middlewares/orders')
const {getIdTest} = require('../../shared/shared')

const postOrder = async (req, res) => {
    try {
        const { order, methodOfPayment, shippingAddress } = req.body
        
        const price = await getPrice(req, res)
        const newOrder = {
            order: order,
            price: price,
            methodOfPayment: methodOfPayment,
            shippingAddress: shippingAddress
        }
        
        const data = await repositories.postOrder(newOrder)

        res.status(200).json({
            message: 'Order completed',
            product: data,
            status: 200
        })
    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
}

const modifyOrder = async (req, res) => {
    try {
        const { order, methodOfPayment, shippingAddress } = req.body
  
        const idUser = getIdTest
        const filter = { idUser: idUser, state: 'new' }
      
        const price = await getPrice(req, res)
        //const description = await getDescription(req, res)
      
        const update = {
          order: order,
          price: price,
          methodOfPayment: methodOfPayment,
          //description: description,
          shippingAddress: shippingAddress
        }
        const data = await repositories.updateOrder(filter, update)
    
            res.status(200).json({
                message: 'Order updated',
                product: data,
                status: 200
            })
    }
    catch (error) {
        return res.status(200).json({ error: error.message })
    }
  }

const getHistory = async (req, res) => {
    try {
        const idUser = getIdTest
        const filter = idUser
        const history = await repositories.getHistory(filter)

        res.status(200).json({
            message: 'Productos obtenidos',
            history: history,
            status: 200
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const confirmOrder = async (req, res) => {
    try {
        const idUser = getIdTest
      
        const filter = { idUser: idUser, state: 'new' }
        const update = { status: 'confirmed'}
      
        const data = await repositories.confirmOrder(filter, update)

        res.status(200).json({
            message: 'Order confirmed',
            history: update,
            status: 200
        })
    }
    catch(error) {
        res.status(500).json({ error: error.message })
    }
  }
  

const allOrders = async (req, res) => {
    try {
        const orders = await repositories.allOrders()

        res.status(200).json({
            message: 'Orders:',
            product: orders,
            status: 200
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const id = req.params.id

        const states = {
            status: status
        }
        const filter = { id: id }

        await repositories.modifyProduct(filter, states)

        res.status(200).json({
            message: 'Status edited',
            status: 200
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getDescription = async (req, res) => { //agregar description para el historial?
    try {
        const { order } = req.body;
        let description = "";

        for (i = 0; i < order.length; i++) {
            const product = await products.findOne({ name: order[i].product })
            const info = `${order[i].amount}x${product.abbreviation}`

            description += info;
        }
        return description
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
}



module.exports = {
    postOrder,
    modifyOrder,
    confirmOrder,
    getHistory,
    allOrders,
    updateStatus
}