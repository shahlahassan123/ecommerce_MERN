const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({ 
        // id: {type: "number", required: "true"},
        addressTitle : {type: "String", required: "true"},
        streetAddress : {type: "String", required: "true"},
        city : {type: "String", required: "true"},
        country : {type: "String", required: "true"},
        zip : {type: "String", required: "true"},
        phone : {type: "String", required: "true"},
        userID: {type: mongoose.Schema.Types.ObjectId, ref:'Users'}

})

module.exports = mongoose.model('Address', addressSchema)