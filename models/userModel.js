const mongoose = require('mongoose')

//schema design
const userSchema = new mongoose.Schema({
     name: {
        type:String,
        required:[true,"Name is Required"]
    },
    email: { 
        type:String,
        required:[true,"email is Required"]
    },
    password: {
        type: string,
        required:[true,"Password is Required"]
    }
    
},{ timestamps:true}
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
