require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGODB_HOST = process.env.MONGODB_HOST
const MONGODB_PORT = process.env.MONGODB_PORT
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME



const conectionString = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}`
//const conectionString = `mongodb://localhost:27017/sprint-2`
mongoose.connect(conectionString, options)

console.log(conectionString)

module.exports = mongoose
