const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const morgan = require('morgan')
const mongoDb = require('./config/connectDb');
const userRoutes = require('./routes/userRoute');
const transactionRoutes= require('./routes/transactionRoute');

// config dot env file
dotenv.config();

// database connection
mongoDb();

const app = express()
//parsing the request
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const port = process.env.port || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user',userRoutes);
// app.post('/transaction/gettransaction', (req, res) =>{
//   console.log(req.body);
// })
app.use('/transaction',transactionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.bgCyan.red)
})