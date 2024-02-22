const mongoose = require("mongoose")
const OrdersModel = require("./../Models/Orders.js")


module.exports.addOrder = async(req, res) =>{

    const { products, totalPrice, address, expectedDeliveryDate, userID } = req.body
    const newOrder = new OrdersModel({ products, totalPrice, address, expectedDeliveryDate, userID })
    try {
        const order = await newOrder.save();
        res.send(order) //sending saved data back to the client
        // res.send("Order created successfully")
    }
    catch (err) {
        console.log(err)
    }
}

// module.exports.getOrdersByUser = async(req,res) =>{
//     let user_id=req.params.id;
//     user_id = user_id.substring(1,user_id.length)
//     console.log("User ID : ", user_id)
//     try {
//         const order = await OrdersModel.find({userID : user_id});
//         res.send(order)
//     }
//     catch (err) {
//         console.log(err)
//     }
// }


module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OrdersModel.find();
        res.send(orders)
        console.log(orders)
    } catch (err) {
        console.log(err)
    }
}

