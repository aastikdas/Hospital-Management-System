import express from 'express'
import { getAllAppointment, postAppointment,updateAppointmentStatus, deleteAppointment} from '../controller/appointment.controller.js'
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post("/post",isPatientAuthenticated,postAppointment)
router.get("/all",isAdminAuthenticated,getAllAppointment)
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment)

export default router