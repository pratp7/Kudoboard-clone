import React,{useEffect} from 'react'
import './App.css'
import CreateTask from './components/create-task'
import LandingPage from './components/LandingPage'
import CreateBoardSection from './components/create-board'
import CreateWihtoutLogin from './components/LandingPage/create-without-login'
import LoginSignup from './components/Login-signup'
import {Routes, Route,Navigate, useLocation} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from './store/actions'
import {isLoaderSelector} from './store/reducers/datareducer'
import Loader from './components/utilities/Loader'
import { bindActionCreators } from 'redux'
import { fetchData } from './store/actions'
import {userSelector} from './store/reducers/authreducer'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoaderSelector)
  const user = useSelector(userSelector)
  const fetchDataFunc = bindActionCreators(fetchData, dispatch)

  
  useEffect(()=> {
    const publicPathNames: string[] = ['/', '/login-page', '/boards/create']
    if(publicPathNames.includes(location.pathname)){
      dispatch(logout())
    }
  }, [location.pathname, dispatch])

  useEffect(()=> {
    if(user){
      fetchDataFunc()
    }
  }, [user])



  return (
      <div>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login-page' element={<LoginSignup/>}/>
          <Route path='/boards/create' element = {<CreateWihtoutLogin/>} />
          <Route element={<PrivateRoutes/>}>
             <Route path='/dashboard' element={!isLoading? <CreateTask/>:<Loader/>}/>
             <Route path='/dashboard/createboard/:id' element = {!isLoading? <CreateBoardSection/>:<Loader/>}/>
             <Route path="*" element={<Navigate to='/dashboard' replace />}/>
          </Route>
          
        </Routes>
    </div>
  );
}

export default App;
