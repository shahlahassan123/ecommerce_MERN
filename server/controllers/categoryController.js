const mongoose = require('mongoose');
const CategoryModel = require('./../Models/Category.js')

module.exports.getAllCategory = async(req,res) =>{
    try{
		const categories = await CategoryModel.find();
        res.send(categories)
        console.log(categories)
}catch(err){
    console.log(err)
}
}