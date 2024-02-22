const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ 
        // id: {type: "number", required: "true"},
        fullName: {type: "String", required: "true"},
        phone: {type: "String", required: "true"},
        email: {type: "String", required: "true"},
        password: {type: "String", required: "true"},   
})

module.exports = mongoose.model('Users', userSchema)