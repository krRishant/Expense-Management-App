const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const morgan = require('morgan')
const mongoDb = require('./config/connectDb');
const userRoutes = require('./routes/userRoute');

// config dot env file
dotenv.config();

// database connection
mongoDb();

const app = express()
//parsing the request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.port || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user',userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.bgCyan.red)
})