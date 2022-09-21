import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { userSelector} from '../store/reducers/authreducer'


const PrivateRoutes = () => {
  const location = useLocation()
    const user = useSelector(userSelector)
    
    return (
        user ? <Outlet/> : <Navigate to='/' state={{from:location}} replace/>
      )
}

export default PrivateRoutes