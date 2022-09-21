import React from 'react'
import titleLogo from '../../images/qbkudosLogo.png'
import './utilities.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/reducers/authreducer'


const Logo = () => {
    const navigate = useNavigate()
    const user = useSelector(userSelector)
    const logoNavigation = (): void => {
        if(user){
            navigate('/dashboard')
        }else{
            navigate('/')
        }
        
    }
  return (
        <figure className='logo-kudoboard' onClick={logoNavigation}>
          <img src={titleLogo} alt="img" />
        </figure>
  )
}

export default Logo