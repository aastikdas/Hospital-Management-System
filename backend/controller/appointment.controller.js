import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { Appointment } from "../models/appointment.model.js";
import {User} from '../models/user.model.js'
export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,dob,gender,appointment_date,address,department,doctor_firstName,doctor_lastName,hasVisited}=req.body
    if( !firstName ||!lastName ||!email ||!phone ||!nic ||!dob ||!gender ||!appointment_date || !address ||   !department ||   !doctor_firstName ||!doctor_lastName ||!hasVisited ){
        return next(new ErrorHandler("Fill out all the feilds", 400))
    }
    const isConflict = await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    })
    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor not found", 400))
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors conflcit please contact through email or phone", 400))
    }
    const doctorId = isConflict[0]._id
    const patientId = req.user._id
    const appointment = await Appointment.create({firstName,lastName,email,phone,nic,dob,gender,appointment_date,address,department,doctor:{firstName:doctor_firstName,lastName:doctor_lastName},hasVisited,doctorId, patientId})
    res.status(200).json({
        success:true,
        message:"Appointment Booked!"
    })
})

export const getAllAppointment = catchAsyncErrors(async (req, res, next)=>{
    const appointments = await Appointment.find()
    res.status(200).json({
        success:true,
        appointments
    })
})

export const updateAppointmentStatus = catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params
    let appointment = await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment not Found due to Invalid Id",404))
    }
    appointment = await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"Appointment Status Updated!",
        appointment
    })
})

export const deleteAppointment = catchAsyncErrors(async (req,res,next)=>{
    const {id}=req.params
    let appointment = await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment not Found due to Invalid Id",404))
    }
    await appointment.deleteOne()
    res.status(200).json({
        success:true,
        message:"Appointment Deleted!",
    })
})