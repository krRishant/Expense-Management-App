const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const cors = require('cors');
const morgan = require('morgan')
const mongoDb = require('./config/connectDb');

// config dot env file
dotenv.config();

// database connection
mongoDb();

const app = express()

app.use(cors());
const port = process.env.port || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.bgCyan.red)
})