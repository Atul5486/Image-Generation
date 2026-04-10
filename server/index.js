import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from "mongoose"
import express from "express"
import PostRouter from './routes/Posts.js'
import Post from './model/Posts.js'
import GenerateImage from './routes/GenerateImage.js'


dotenv.config();
const app=express();
app.use(cors());
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true}))

app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "Something went wrong"
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

// Api post router

app.use("/api/post",PostRouter);
app.use("/api/generateImage",GenerateImage)


// Default get
app.get('/', async (req,res)=>{
    res.status(200).json({
        message:"Hello form Backend side"
    })
})

// Connect mongodb

const connectDB=()=>{
    mongoose.set("strictQuery",true);
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("MongoDb Connected"))
    .catch((err)=>console.log(err))
}
 
// Start server
const startserver=async()=>{ 
    try{
        connectDB();
        app.listen(3000,()=>console.log("Server started"))
    }catch(err){
        console.log(err);
    }   
}
startserver();