const mongoose = require('mongoose');

const ProductsModel = mongoose.Schema({
    id:{type: Number, required : true, unique: true},
    title:{type: String, required : true},
	price:{type: Number, required: true},
    description:{type: String},
	image:{type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref:'Category'}
})

module.exports = mongoose.model('Products', ProductsModel)