const users = require ('../model/users')
const Error = require ('../../helpers/httpMessage')

const findAll = async (req,res) =>  await users.find(); 

const update = async (filter, update) => await users.findOneAndUpdate(filter, update, { returnOriginal: false });

const deleteUser = async (filter) => { await users.findByIdAndDelete (filter) }

module.exports = {
    findAll,
    update,
    deleteUser
}
