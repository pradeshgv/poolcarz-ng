require("dotenv").config()
const express = require('express');
const route = require('./routes/routing');
const mongoose = require("mongoose")
const port = 5000;


const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
};

const app = express();

app.use(express.json());

app.use(cors);

app.use((req, res, next) => {
  next();
});

app.use("/api", route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/dist/pool-carz"));
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
