const mongoose = require('../../config/db.config')
const { Schema } = mongoose

const productScheme = new Schema({
    name: { type: String, required: true },
    //description: { type: String, required: true },
    price: { type: Number, required: true },
    isVisible: { type: String, required: true, default: 'true' },
},
    {
        timestamps: true
    }
)
//faltan las imagenes
const products = mongoose.model('products', productScheme)

module.exports = products