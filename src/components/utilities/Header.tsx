import React from 'react'
import './utilities.css'
import Createkudoboard from './create-kudoboard'
import { useNavigate } from 'react-router-dom'
import Logo from './logo'
const Header = () => {
  const navigate = useNavigate()

  const signinHandler = (): void => {
    navigate('/login-page')
  }
  return (
      <header className='common-layout'>
       <Logo />
        <div className='signin'>
            <button onClick={signinHandler} className='signin-button'>Sign in</button>
            <Createkudoboard/>
        </div>
      </header>
  )
}

export default Header