require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


const app = express();


app.use(cors())
app.use(express.json())

connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT ;



app.listen(PORT,()=>{
    console.log(`the server is running on port number ${PORT}`)
})