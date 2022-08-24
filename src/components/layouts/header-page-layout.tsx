import React, {cloneElement} from 'react'
import classes from '../css/createTask.module.css'
import CreateTaskCard from '../create-task/createTask-card'
import { useSelector, useDispatch } from 'react-redux'
import {newBoardSelector} from '../../store/reducers/taskReducer'
import { newboardHandler, closeModal } from '../utilities/methods'

type Props = {
    children: JSX.Element
}

const HeaderPageLayout = ({children}:Props) => {
    const dispatch = useDispatch()
    const showNewBoard = useSelector(newBoardSelector)

  const closeModalFunction = () => closeModal(dispatch)
  const newboardHandlerFunction = () => newboardHandler(dispatch)
  return (
    <>
    {showNewBoard && <CreateTaskCard closeModal={closeModalFunction} />}
    <div onClick={showNewBoard ? closeModalFunction : ()=>{}}>
      <div className={showNewBoard ? `${classes['dashboard-section-blur']} ${classes['dashboard-section-pointer']}` : `${classes['dashboard-section']}`}>
            {cloneElement(children, {newboardHandler:newboardHandlerFunction})}
        </div>
    </div>
    </>
  )
}

export default HeaderPageLayout