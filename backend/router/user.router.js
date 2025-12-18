import express from 'express'
import {addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, patientRegister, userLogin,addNewDoctor} from '../controller/user.controller.js'
import {isPatientAuthenticated, isAdminAuthenticated} from '../middlewares/auth.js'
const router= express.Router()

router.post("/patient/register", patientRegister)
router.post("/login", userLogin)
router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin)

router.get("/doctors", getAllDoctors )
router.get("/admin/me", isAdminAuthenticated, getUserDetails)
router.get("/patient/me", isPatientAuthenticated, getUserDetails )

router.get("/admin/logout", isAdminAuthenticated, logoutAdmin )
router.get("/patient/logout", isPatientAuthenticated, logoutPatient )

router.post("/doctor/adddoctor",isAdminAuthenticated,addNewDoctor)

export default router 