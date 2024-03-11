require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.urlencoded(({extended:true})));
app.use(express.json());


const port = 6400;
const connectDB = require("./DB/connString");

const routes_info = require("../backend/routes/route");

app.use("/",routes_info);

const start = async()=>{
    try {
        await connectDB(process.env.DB_Add);
        app.listen(port,()=>{
            console.log("server started:6400");
        })
    } catch (error) {
        console.log(error);
    }
}

start();