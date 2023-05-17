const express = require('express');
const {addTransaction, getTransactions,editTransaction,deleteTransaction } = require( '../controllers/transactionController');

const router = express.Router();
//check
router.get('/check', function (req, res) {
    res.send("check");
})

//add transaction route
router.post('/addtransaction',addTransaction);

//edit transaction route
router.post('/edittransaction',editTransaction);

//delete transaction route
router.post('/deletetransaction',deleteTransaction);

// get transaction route
router.post('/gettransaction', getTransactions);

module.exports = router;
