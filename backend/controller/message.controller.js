import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.middleware.js'
import { Message } from "../models/message.model.js"
import ErrorHandler from '../middlewares/error.middleware.js'

export const sendMessage = catchAsyncErrors(async (req,res,next)=>{
    // console.log(req.body);
    const {firstName,lastName,email,phone,message}=req.body
    if (!firstName || !lastName|| !email|| !phone|| !message){
        // return res.status(400).json({
        //     success: false,
        //     message:"Please fill all the feilds"
        // })   
        return next(new ErrorHandler("Please fill all the feilds",400))      
    }
    await Message.create({firstName,lastName,email,phone,message})
    res.status(200).json({
        success:true,
        message:"Message sent successfully"
    })
})

export const getAllMessages = catchAsyncErrors(async (req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages
    })
})