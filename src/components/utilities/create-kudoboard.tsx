import React from 'react'
import { Link } from "react-router-dom";
import './utilities.css'
const Createkudoboard = () => {
  return (
    <Link to='/boards/create' className='create-kudoboard'>Create a KudoBoard</Link>
  )
}

export default Createkudoboard