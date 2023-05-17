const  transactionModel = require('../models/transactionModel.js');
const moment = require('moment');
//add transaction 
const addTransaction = async (req,res) => {
    try {
            const transaction = await transactionModel(req.body);
            const result = await transaction.save();
            console.log(result);
            res.status(201).json({
                transactionid: result._id,
                success: true,
                message: "Transaction Added"});
        } catch (error) {
            res.status(500).json(error);
        }
}
/// edit transaction

const editTransaction = async (req,res) => {
    try {
        const result = await transactionModel.findOneAndUpdate({
            _id: req.body.transactionid},
            req.body.payload
              
        );
        console.log(result);
        res.status(200).json({
            trasactionid:result._id,
            success: true,
            message: "Transaction Updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    } 
}
// delete transaction

const deleteTransaction = async (req,res) => {
    try {
        const result = await transactionModel.findOneAndDelete({
            _id: req.body.transactionid,
            userid: req.body.userid
        });
        console.log(result);
        res.status(200).json({
            trasactionid:result._id,
            success: true,
            message: "Transaction Deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    } 
}

//get transaction
const getTransactions = async (req,res) => {
    try {
        var {frequency,selectedDate,type} = req.body;
        if(frequency=="ALL") frequency = 5000; 
        // console.log(type);
        // console.log(frequency,":",moment().subtract(Number(frequency), 'd').toDate());
        // console.log(selectedDate[0], selectedDate[1])
        const transactions = await transactionModel.find({
            
            ...(frequency!=="Custom" ? {
                date: {
                    $gte: moment().subtract(Number(frequency), 'd').toDate(),
                },
            }:{
                date:{

                    $gt: selectedDate[0],
                    $lt: selectedDate[1]
                }
            }),
            ...(type!=='ALL' && {type:type}),
            userid: req.body.userid},
            );
        res.status(200).json(transactions);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {addTransaction, getTransactions,editTransaction,deleteTransaction};