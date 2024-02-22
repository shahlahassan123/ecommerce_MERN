const mongoose = require('mongoose');

const CategoryModel = mongoose.Schema({
    id:{type: Number, required : true, unique: true},
    name:{type: String, required : true},
    name:{type: String},
	
})

module.exports = mongoose.model('Category', CategoryModel)