const mongoose = require("mongoose")
const AddressModel = require("./../Models/Address.js")

module.exports.addAddress = async(req, res) =>{

    const { addressTitle, streetAddress,city,country ,zip,phone,userID } = req.body
    const newAddress = new AddressModel({ addressTitle,streetAddress,city,country ,zip,phone,userID })
    try {
        const address = await newAddress.save();
        res.send("Address added successfully")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.getAddressByUser = async(req,res) =>{
    let user_id=req.params.id;
    user_id = user_id.substring(1,user_id.length)
    console.log("User ID : ", user_id)
    try {
        const address = await AddressModel.find({userID : user_id});
        console.log("Add", address)
        res.send(address)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.getAddressByTitle = async(req,res) =>{
    let {addressTitle}=req.query;
    console.log("title", addressTitle)
    try {
        const address = await AddressModel.findOne({addressTitle});
        console.log("Addss", address)
        res.send(address)
    }
    catch (err) {
        console.log(err)
    }

}
