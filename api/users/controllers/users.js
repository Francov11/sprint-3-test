const users = require ('../model/users')
const http = require ('../../helpers/httpMessage')
const repositories = require ('../repositories/users')
const {getIdUser} = require('../../shared/shared')

const findAll = async (req, res) => {
    try {
        const users = await repositories.findAll()
        res.json({
            status: (200),
            message: 'Usuarios obtenidos',
            user: users,
        });
    }
    catch (err){
        http.Error(req,res,err);
    }
}

const update = async (req, res) => {
    try {
        const { name, lastname, email, phoneNumber, password, isAdmin, isLogged, isActive} = req.body
        const idUser = getIdUser(req)
        const filter = { _id: idUser }

        const user = {
            name: name, 
            lastname: lastname,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            isAdmin: isAdmin,
            isLogged: isLogged,
            isActive: isActive
        }



        await repositories.update(filter, user)

        res.status(400).json({ 
            msj: 'User Updated.',
            status: 200
            })
    }
    catch (err){
        http.Error(req,res,err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const idUser = getIdUser(req)
        const filter = { _id: idUser }
        
        await repositories.deleteUser(filter)

        res.json({
            status: (200),
            message: 'User deleted',
            user: users,
        });
    }
    catch (err){
        http.Error(req,res,err);
    }
}


module.exports = {
    findAll,
    update,
    deleteUser
}