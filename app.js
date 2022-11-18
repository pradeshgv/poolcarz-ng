require("dotenv").config()
const express = require('express');
const bodyparser = require('body-parser');
const myReqLogger = require('./Utilities/requestLogger');
const route = require('./routes/routing');
const cors=require('cors');
const app = express();
const mongoose = require("mongoose")
app.use(myReqLogger);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use('/api',(rq, rs,n)=>{console.log("hello");n()},  route);
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist/pool-carz"));
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "pool-carz", "index.html")
    );
  });
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
    console.log('DB connection successful!');});
module.exports = app;
