
const repositories = require('../repositories/addressBook')
const helper = require ('../../helpers/httpMessage')
const { getIdUser, getIdTest } = require('../../shared/shared')

const listAddressBook = async (req, res) => {
    try {
        const { addressBook } = req.body
       const idUser = getIdUser(req)
       const {userId} = req.data
       console.log('hola'+ userId)
       const filter = ({userId})
        const result = await repositories.getaddressBook(filter)

        res.json({
            status: 200,
            message: 'AddresBook list',
            addressBook: result,
        })
    }
    catch (err){
        helper.Error(req,res,err);
    }
}

const addAddress = async (req, res) => {
    try {
        const { address } = req.body

        const idUser = getIdUser(req)
        const filter = (idUser)
        console.log('line 34')
        console.log(filter)
        
        const data = repositories.createAddress(filter, address)
        console.log(data)
        console.log(address)

        res.json({
            message: 'Address added',
            address: address,
            status: 200
        })
    }
    catch (err){
        helper.Error(req,res,err);
    }
}

const deleteAddress = async (req, res) => {
    try {
        //const { shippingAddress, address } = req.body
        const { shippingAddress } = req.params
        const idUser = getIdTest(req)
        //const id = req.params.id

        const filter = {  _id: idUser  }
        //const filter2 = { id: id }

        repositories.deleteAddresTest(filter, shippingAddress)
     
        res.json({
            message: 'dirección eliminada',
            status: 200
        })
    }
    catch (err){
        helper.Error(req,res,err);
    }
}

module.exports = {
    listAddressBook,
    addAddress,
    deleteAddress
}
