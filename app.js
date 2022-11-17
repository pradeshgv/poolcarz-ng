require("dotenv").config()
const express = require('express');
const bodyparser = require('body-parser');
const myReqLogger = require('./Utilities/requestLogger');
const route = require('./Routes/routing');
const cors=require('cors');
const app = express();
const mongoose = require("mongoose")
app.use(myReqLogger);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use('/',(rq, rs,n)=>{console.log("hello");n()},  route);
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
    console.log('DB connection successful!');});
module.exports = app;
