require('dotenv').config();
const httpMessage = require("../helpers/httpMessage");
const jwt = require('jsonwebtoken');
const users = require ('../users/model/users');


const isAuthenticated = async (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;//["Authorization"]
        console.log(bearerHeader);
        if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(" ");
                const bearerToken = bearer[1];
                req.token = bearerToken
                jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
                    if(err){
                        console.log(err);
                        res.sendStatus(403)
                    } else {
                        console.log(data);
                        req.data = data
                        //return data
                        next();
                    }
                });
            }
    }
    catch (err) {
        httpMessage.Error(req, res, err)
    }   
}


const isAdmin = async (req, res, next) => {
    try {
        const params = {
            where: {
            id: req.params.id,
            email: req.data.email,
            admin: true
            }
        }
        const result = await users.exists(params);
        console.log("line 141", result)
        if(result) {
            next();
        } else {
            httpDenied(req, res);
        };
    }
    catch (err) {
        httpError(req, res, err);
    }
}

const isSuspended = async (req, res, next) => {
    try {
        const idUser = getIdUser(req)
        const suspended = await users.exists({ _id: idUser, isActive: true })
        !suspended ? res.status(404).json({ msg: 'Not authorized', status: 404 }) : next()
    } catch (err){
        httpMessage.Error(req, res, err)
    }
}

/*
const isAdmin = async (req, res, next) => {
    try {
        const idUser = getIdUser(req)
        const adminExist = await users.exists({ _id: idUser, isAdmin: true })
        !adminExist ? res.status(404).json({ msg: 'Not authorized', status: 404 }) : next()
    } catch {
        res.status(404).json({ msg: 'Not authorized', status: 404 })
    }
}
const getIdUser = (req) => {
    const token = req.headers.authorization.replace('Bearer ', '')
    const { userId } = req.data
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    const idUser = decoded.id
    const idUser2 = ({_id: idUser})

    console.log(userId)

    return idUser
}*/

const getIdUser = (req) => {

    const { userId } = req.data

    //const idUser = ({userId: idUser})

    console.log(userId)



    return userId
}
  

module.exports = {
    isAuthenticated,
    isAdmin,
    isSuspended,
    getIdUser

}