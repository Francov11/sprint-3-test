const jwt = require('jsonwebtoken');
const users = require ('../model/users')
const helper = require ('../../helpers/httpMessage')

require('dotenv').config();

const register = async (newUser) => {
    const user = new users(newUser)
    const response = await user.save()
    return response
    }

const login = async (filter) => await users.findOne(filter)

module.exports = {
    register,
    login
}
