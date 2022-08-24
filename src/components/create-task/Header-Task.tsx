import React from 'react'
import '../utilities/utilities.css'
import {useNavigate} from 'react-router-dom'
import Logo from '../utilities/logo'
import {useDispatch} from 'react-redux'
import {Logout} from '../../Firebase'
import {logout} from '../../store/actions'
type Props = {
  newboardHandler: () => void
}
const HeaderTask = ({newboardHandler}: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navigateToDashBoard = (): void => {
    navigate('/dashboard')
  }

  const signoutHandler = () : void => {
    Logout().then(()=> {
      console.log('logged out')
      dispatch(logout())
      navigate('/')

    }).catch((error) => {
      console.log(error.message)
    })
  }
  return (
    <header className='common-layout'>
        <Logo />
        <div className='signin'>
            <button onClick={navigateToDashBoard}>Dashboard</button>
            <button onClick={newboardHandler}>New Board</button>
            <button onClick={signoutHandler}>Sign out</button>
        </div>
    </header>
  )
}

export default HeaderTask