
/*
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
                        next();
                    }
                });
            }
    }
    catch (err) {
        helper.Error(req, res, err)
    }   
}

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
    console.log("hola desde getiduser")
    const token = req.headers.authorization.replace('Bearer ', '')
    

    const decoded = jwt.verify(token, process.env.SECRET)
    const idUser = decoded.id
    console.log('ID DEL USUARIO:' + idUser)
    return idUser
}

const getIdTest = (req, res) => {
    const idUser = {
        email: req.data.email,
        id: req.params.id
        //id: req.data.id
    }
    return idUser
}

module.exports = {
    isAuthenticated,
    isAdmin,
    getIdUser,
    getIdTest
}*/