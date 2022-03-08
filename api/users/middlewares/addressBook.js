const users = require('../models/users.models')

const validateAddress = async (req, res, next) => {
    try {
        const { address } = req.body
        if (!address) return res.status(404).json({ msg: 'Fill in all the fields', status: 404 })
        const idUser = getIdUser(req)

        //se puede mejorar ya que se podrian obtener menos datos de una query
        const user = await users.findOne({ _id: idUser })

        const addresses = user.addressBook
        const addressExist = (addresses.find(addresses => addresses.shippingAddress == address))
        addressExist ? res.status(404).json({ msg: 'The shippingAddress already exists', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 })
    }
}

const validateAddressParameter = async (req, res, next) => { //no funciona
    try {
        const { shippingAddress } = req.params;
        const idUser = getIdUser(req)

        const user = await users.findOne({ _id: idUser })

        const addresses = user.addressBook
        const idExist = (addresses.find(addresses => addresses.shippingAddress == shippingAddress))
        !idExist ? res.status(404).send({ msg: 'thes address does not exist', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'thes address does not exist', status: 404 })
    }
}

module.exports = {
    validateAddress,
    validateAddressParameter
}