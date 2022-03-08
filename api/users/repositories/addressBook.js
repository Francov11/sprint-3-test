const users = require('../model/users')

//const getaddressBook = async (filter) => {
//    const user = await users.findOne(filter)
//    return addressBook
//}
const getaddressBook = async (filter) => await users.findOne({filter})


const createAddress = async (filter, address) => await users.updateOne({ filter }, { $push: { addressBook: { shippingAddress: address} }})

const deleteAddress = async (filter, filter2) => await users.updateOne({ filter }, { $pull: { addressBook: {shippingAddress: filter2 } } })

const deleteAddresTest = async (filter, shippingAddress) => await users.findByIdAndDelete({ filter }, { addressBook: {shippingAddress: shippingAddress } })

module.exports = {
    createAddress,
    getaddressBook, 
    deleteAddress,
    deleteAddresTest
}