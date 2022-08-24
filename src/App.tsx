import React,{useEffect} from 'react'
import './App.css'
import CreateTask from './components/create-task'
import LandingPage from './components/LandingPage'
import CreateBoardSection from './components/create-board'
import CreateWihtoutLogin from './components/LandingPage/create-without-login'
import LoginSignup from './components/Login-signup'
import {Routes, Route,Navigate} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import {useDispatch, useSelector} from 'react-redux'
import { fetchData, logout } from './store/actions'
import { bindActionCreators } from 'redux'
import {isLoaderSelector, formDataArraySelector} from './store/reducers/datareducer'
import Loader from './components/utilities/Loader'
import { taskTileDataFormatType } from './components/utilities/constants'

function App() {
  const publicPathNames: string[] = ['/', '/login-page', '/boards/create']
  const dispatch = useDispatch()
  const fetchDataFunc = bindActionCreators(fetchData, dispatch)
  const isLoading = useSelector(isLoaderSelector)
  const boardDetails: taskTileDataFormatType[] = useSelector(formDataArraySelector)
  
  useEffect(()=> {
    fetchDataFunc()
  }, [boardDetails.length])

  
  useEffect(()=> {
    if(publicPathNames.includes(window.location.pathname)){
      dispatch(logout())
    }
  }, [window.location.pathname])
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
