import React from 'react'
import classes from './index.module.css'
import googleLogo from '../../images/google-logo.png'
import { useNavigate } from 'react-router-dom'
import LandingPageLayout from '../layouts/landing-page-layout'
import '../utilities/utilities.css'
import { signInwithGoogle } from '../../Firebase'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions'

const LoginSignup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authenticationhandler = (): void => {
        signInwithGoogle().then((res) => {
            console.log('res: ', res.user)
            dispatch(login(res.user, res.user.email || '', res.user.displayName || ''))
            navigate('/dashboard')
          }).catch((error) => {
            console.log(error.message)
          })
    }

  return (
    <LandingPageLayout loginPage={true}>
        <div className={`${classes['login-signup-card']}`}>
        <h2>Click on the button to Login/Register</h2>
        <button onClick={authenticationhandler}>
            <img src={googleLogo} alt='google-logo' /> 
            Sign in with Google
        </button>
    </div>
    </LandingPageLayout>
  
  )
}

export default LoginSignup