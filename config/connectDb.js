const mongoose = require("mongoose");

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Db connected on ${mongoose.connection.host}`);
    } catch (error) {
        console.log("err ==> " , error);
    }

}

module.exports = connectDb;