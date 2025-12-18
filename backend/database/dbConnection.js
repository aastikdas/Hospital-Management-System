import mongoose from "mongoose";

export const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")
    }catch(err){
        console.log(`Caught an error : ${err}`)
    }
}