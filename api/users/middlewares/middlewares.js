const users = require('../model/users')
const http = require('../../helpers/httpMessage')
const bcrypt = require('bcrypt')

const charactersEmail = async (req, res, next) => {
    try {
        const { email } = req.body
        const characters = /^([\da-z_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
        if(!characters.exec(email)) return res.status(404).json({ msg: 'The email has invalid characters', status: 404 })
        next();
    }
    catch (err){
        http.Error(req, res, err)
    }
}

const validateUser = async (req, res, next) => {
    try {
        const { name, lastname, email, phoneNumber,  password, repeatPassword } = req.body
        if (!name || !lastname || !email || !phoneNumber || !password || !repeatPassword ) return res.status(404).json({ msg: 'Faltan datos', status: 404 })

        if( password !== repeatPassword) return res.status(404).json({ msg: 'Contraseñas no coinciden', status: 404 })
        
        const nameExist = await users.exists({ email: email });
        nameExist ? res.status(404).json({ msg: 'The email already exists', status: 404 }) : next()

    } catch (err){
        http.Error (req, res, err)
    }
}

const validateLogin = async (req, res, next) => {
    try {
        const { email, password} = req.body
        if (!email || !password ) return res.status(404).json({ msg: 'Faltan datos', status: 404 })

        const user = await users.findOne({ email: email });

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) return res.status(404).json({ msg: 'Contraseñas no coinciden', status: 404 })
        next();

    }
    catch (err) {
        http.Error(req, res, err)
    }
}

module.exports = {
    charactersEmail,
    validateUser,
    validateLogin
}