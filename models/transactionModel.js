const mongoose = require( "mongoose");

const transactionschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type:{
            type: String,
            required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    description: {
            type: String,
            
    },
    reference: {
        type: String,
    }    
},{timestamps:true})

const transactionModel = mongoose.model("transactionModel", transactionschema);

module.exports = transactionModel;