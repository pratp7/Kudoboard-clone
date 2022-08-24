import React from 'react'
import '../utilities/utilities.css'
import Logo from '../utilities/logo'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: JSX.Element,
    loginPage?: boolean
}
const LandingPageLayout = ({children, loginPage}: Props) => {
    const navigate = useNavigate()

    const signinHandler = (): void => {
        navigate('/login-page')
    }
  return (
    <div className='create-without-login'>
        <nav className='common-layout'>
            <Logo />
            <div className='create-signin'>
             {!loginPage && <button className='register-button' onClick={signinHandler}>Sign in / Register</button>} 
            </div>
        </nav>
        <section>
            {children}
        </section>
    </div>
  ) 
}

export default LandingPageLayout