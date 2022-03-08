const jwt = require('jsonwebtoken');
const users = require ('../model/users');
const http = require ('../../helpers/httpMessage');
const repositories = require ('../repositories/auth');
const { getIdUser } = require('../../shared/shared')
const bcrypt = require ('bcrypt')

require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, lastname, email, phoneNumber, password} = req.body 
        console.log('line12')
        const passwordHash = await bcrypt.hash(password, 8)

        console.log('line14')
        const newUser = {
            name: name, 
            lastname: lastname,
            email: email,
            phoneNumber: phoneNumber,
            password: passwordHash,
        }

        const user = await repositories.register(newUser)

        res.json({
            message: 'usuario creado',
            status: 200
        });
    }
    catch (err) {
        console.log("hola desde error register")
        http.Error(req, res, err)
    }
}

const login = async (req, res) => {
    try {
        /*onst filter = {
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }*/
        const { email } = req.body
        //onst userId = getIdUser(req)
        const filter = ({email: email})

        const result = await repositories.login(filter)
        console.log(result)
        //console.log(req.body)
        if(result) {
            const { password, email } = req.body;
            console.log("signup", password, email);
            jwt.sign(
                {email, userId: result._id},
                process.env.SECRET_KEY,
                { expiresIn: process.env.JWT_EXPIRES_IN },
                (err, token) => {
                    if (err) {
                        http.Error(req,res,err)
                    } else {
                    req.token = token;
                    console.log('TOKEN:', token)
                    //console.log(userId)
                    res.json({token});
                    }
                }
                );
        }
        else {
            http.Error(req,res,err)
        } 

    }
    catch (err){
        console.log(Error)
    }
}


module.exports = {
    register,
    login,
}