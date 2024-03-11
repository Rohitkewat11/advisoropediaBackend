const mongoose = require("mongoose");

const connectDB = (uri)=>{
    return(
        mongoose.connect(uri).then(()=>{
            try {
                console.log("DataBase connect huaaa");
            } catch (error) {
                console.log(error);
            }
        })
    )
}

module.exports = connectDB;