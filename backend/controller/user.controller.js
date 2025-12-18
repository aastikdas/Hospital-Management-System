import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.middleware.js'
import ErrorHandler from '../middlewares/error.middleware.js'
import { User } from '../models/user.model.js'
import { generateToken } from '../utils/jwtToken.js'
import cloudinary from 'cloudinary'

export const patientRegister =  catchAsyncErrors(async function(req,res,next){
    //check if all fields
    const {firstName, lastName, email,phone,dob,nic, gender,password} = req.body
    if (!firstName || !lastName|| !email|| !phone|| !dob || !nic || !gender || !password ){
        return next(new ErrorHandler("Please fill all the feilds",400))
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(new ErrorHandler("User already exists", 400))
    }
    const newUser = await User.create({firstName, lastName, email,phone,dob,nic, gender,password,role:"Patient"})
    generateToken(newUser, "Patient registered Successfully", 200, res)
    // res.status(200).json({
    //     success:true,
    //     message:"Patient registered Successfully"
    // })
})

export const userLogin = catchAsyncErrors(async (req,res,next)=>{
    const {email, password, confirmPassword, role }= req.body;
    if(!email || !password|| !confirmPassword || !role){
        return next(new ErrorHandler("All Feilds are required", 400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password should be same"), 400)
    }
    const user= await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid user Credentials",400))
    }
    const isPassMatch = await user.comparePassword(password)
    if(!isPassMatch){
        return next(new ErrorHandler("Invalid user Credentials",400))
    }
    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found",400))
    }

    generateToken(user, ` ${user.role} logged in Successfully`, 200, res)
//     res.status(200).json({
//         success:true,
//         message:"Patient logged in Successfully"
//     })
})

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {firstName, lastName, email,phone,dob,nic, gender,password} = req.body
    if (!firstName || !lastName|| !email|| !phone|| !dob || !nic || !gender || !password){
        return next(new ErrorHandler("Please fill all the feilds",400))
    }

    const user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler(` ${user.role} with this email already exists`, 400))
    }
    await User.create({firstName, lastName, email,phone,dob,nic, gender,password,role:"Admin"})
    // no need for this line because,
    // generateToken(newAdmin, "New Admin registered Successfully", 200, res)
    res.status(200).json({
        succcess:true,
        message:"New Admin registered Successfully"
    })
})

export const getAllDoctors = catchAsyncErrors(async (req,res,next)=>{
    const doctors = await User.find({role:"Doctor"})
    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user= req.user
    res.status(200).json({
        success:true,
        user
    })
}) 

export const logoutAdmin = catchAsyncErrors(async (req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Admin Logged Out Successfully!"
    })
})

export const logoutPatient = catchAsyncErrors(async (req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Patient Logged Out Successfully!"
    })
})

export const addNewDoctor = catchAsyncErrors(async (req,res,next)=>{
    // only concern about avatar 
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Avatar Required",400))
    }
    const {docAvatar} = req.files
    const allowedFormates = ["image/jpg","image/jpeg","image/png","image/webp"]
    if(!allowedFormates.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File formate not supported", 400))
    }
    const {firstName, lastName, email,phone,dob,nic, gender,password,doctorDepartment} = req.body
    if (!firstName || !lastName|| !email|| !phone|| !dob || !nic || !gender || !password ||!doctorDepartment){
        return next(new ErrorHandler("Please fill all the feilds",400))
    }
    const user = await User.findOne({email})
    if(user){
        return next(new ErrorHandler(`{user.role} with this email already exists`,400))
    }
    //cloudinary pe image send
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown Cloudinary Response error")
    }
    const doctor = await User.create({firstName, lastName, email,phone,dob,nic, gender,password,doctorDepartment, role:"Doctor", docAvatar:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
    }})
    res.status(200).json({
        succcess:true,
        message:"New Doctor registered Successfully",
        doctor
    })
})