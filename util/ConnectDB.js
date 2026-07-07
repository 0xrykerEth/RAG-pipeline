import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);


//PASTE YOUR USERNAME AND PASSWORD 
// // rag IS DB name
const uri = `mongodb+srv://${USER:PASSWORD}@cluster0.m17rjaw.mongodb.net/rag?retryWrites=true&w=majority`


const ConnectDB = async() =>{
    try{
        await mongoose.connect(uri)
    }catch(err){
        console.log(err)
    }
}


export default ConnectDB;