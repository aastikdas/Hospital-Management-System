import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForms from '../components/MessageForms'
const Home = () => {
  return (
    <div>
      <Hero title={"Welcome to MediTrack Medical Center | Compassionate Care, Trusted Expertise"} imageUrl={"/hero.png"}/>
      <Biography imageUrl={'/whoweare.png'}/>
      <Departments/>
      <MessageForms/>
    </div>
  )
}

export default Home
