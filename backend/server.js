const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'chrome-extension://jknlnahjcdcbdlngkfilcaahfbghhbib'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload()); 

const userRoutes = require('./routes/userRoutes');

app.use('/api/v1',userRoutes);

dotenv.config({
  path : "backend/configs.env",
});

mongoose.connect(process.env.DB_URI).then((data)=>{
  console.log(`Mongodb connected with server : ${data.connection.host} `)
})


app.listen(process.env.PORT,()=>{
  console.log("Server running on port : " + process.env.PORT);
})

