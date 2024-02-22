const mongoose = require('mongoose');

const OrdersModel = mongoose.Schema({
    products:  [{
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            quantityPrice: { type: Number, required: true },
        }],
	totalPrice:{type: Number},
    address:{type: Object},
    expectedDeliveryDate:{type: Date},
    userID: {type: mongoose.Schema.Types.ObjectId, ref:'Users'}
})

module.exports = mongoose.model('Orders', OrdersModel)

