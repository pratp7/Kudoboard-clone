import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { userSelector, isUserLogged } from '../store/reducers/authreducer'


const PrivateRoutes = () => {
    const user = useSelector(userSelector)
    const isLogged = useSelector(isUserLogged)
    return (
        user ? <Outlet/> : <Navigate to='/'/>
      )
}

export default PrivateRoutes