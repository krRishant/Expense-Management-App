// const e = require('express');
const userModel = require('../models/userModel.js');

// Login Controller
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email: email})
        if(user.email === email && user.password != password){
            return res.status(200).json({message: 'Incorrect password'})
        }
        if (!user) {
            return res.status(401).json({message: 'wrong Credentials'})
        }
        res.json(user);
    } catch (error) {
        res.status(404).json(
            {success:false, 
            error:error
            }
        )
    }
}

// Register Controller
const registerController = async (req,res) => {
       try {
        const newuser = new userModel(req.body);
        await newuser.save();
        res.status(201).json({
                    success:true,
                    message: 'User Created'
                })
    } catch (error) {
        res.status(402).json({
            success:false,
            error
        })
    }
    console.log(req.body);
    
}

module.exports = {loginController, registerController};