const mongoose = require("mongoose")
const userModel = require("./../Models/Users.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


 // "mongoose": "^7.2.2",

module.exports.addUser = async(req,res) =>{
    try{
        const {fullName, phone,email, password} = req.body
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await userModel.findOne({email})
        if(user){
            res.status(400).send("User already exists")
        }
        const newUser = new userModel({
            fullName,
            phone,
            email,
            password: hashedPassword
        })
        const registeredUser = await newUser.save();
        // res.send("User registered successfully.")
        const token = jwt.sign({id: registeredUser._id}, 'secret')
        res.send({token, userID: registeredUser._id})
        

    }
    catch(err){
        console.log(err)
    }

}

module.exports.userLogin = async(req,res) =>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!email){
            res.status(400).send("Email Invalid")
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            res.status(400).send("Password Invalid")
        }
        const token = jwt.sign({id: user._id}, 'secret')
        res.send({token, userID: user._id})

    }
    catch(err){
        console.log(err)
    }
}

module.exports.verifyToken = async(req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        jwt.verify(authHeader, 'secret', (err)=>{
            if(err){
               return res.sendStatus(403)
            }
            next()
        })
    }else{
        res.sendStatus(401)
    }
}