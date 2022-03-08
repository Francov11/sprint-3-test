const mongoose = require("../../config/db.config")
const { Schema } = mongoose

const orderScheme = new Schema({
	idUser: { type: mongoose.Types.ObjectId, require: true },
	order: [
		{
			product: { type: Object, require: true },
			amount: { type: Number, require: true },
		},
	],
	status: { type: String, default: "new" },
	price: { type: Number, require: true },
	methodOfPayment: { type: String, require: true },
	shippingAddress: { type: String, require: true },
	hour: { type: String, require: true },
},
	{
		timestamps: true
	}
)

const orders = mongoose.model("orders", orderScheme)

module.exports = orders