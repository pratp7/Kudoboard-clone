import classes from './index.module.css'
import googleLogo from '../../images/google-logo.png'
import { useNavigate } from 'react-router-dom'
import LandingPageLayout from '../layouts/landing-page-layout'
import '../utilities/utilities.css'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../store/actions'
import { bindActionCreators } from 'redux'

const LoginSignup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginActionFunc = bindActionCreators(loginAction, dispatch)

    const authenticationhandler = (): void => {
      loginActionFunc(navigate)
      
    }

  return (
    <LandingPageLayout loginPage>
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