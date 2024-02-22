const mongoose = require('mongoose');
const ProductsModel = require('./../Models/Products.js')

module.exports.getAllProducts = async(req,res) =>{
    try{
		const products = await ProductsModel.find();
        res.send(products)
        console.log(products)
}catch(err){
    console.log(err)
}
}