import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.middleware.js";
import ErrorHandler from "./error.middleware.js";
import jwt from 'jsonwebtoken'
//authenticaiton
export const isAdminAuthenticated = catchAsyncErrors( async (req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not Authenticated",400))
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY)
    req.user = await User.findById(decoded.id)
    //authorisation
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorised for this resources `,403))
    }
    next()
})

export const isPatientAuthenticated = catchAsyncErrors( async (req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient not Authenticated",400))
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY)
    req.user = await User.findById(decoded.id)
    //authorisation
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorised for this resources `,403))
    }
    next()
})