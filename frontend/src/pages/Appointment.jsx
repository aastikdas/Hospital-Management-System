import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'

const Appointment = () => {
  return (
    <>
    <Hero title={"Please fill the Appointment Form"} imageUrl={"/hero.png"}/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment
