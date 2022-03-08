const mongoose = require('../../config/db.config')
const { Schema } = mongoose

const statusScheme = new Schema({
    status: { type: String, required: true },
},
    {
        timestamps: true
    }
)
const orderStatuses = mongoose.model('orderStatuses', statusScheme)

module.exports = orderStatuses