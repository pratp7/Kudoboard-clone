import React, {cloneElement, useState} from 'react'
import classes from '../css/createTask.module.css'
import CreateTaskCard from '../create-task/createTask-card'
import { useSelector, useDispatch } from 'react-redux'
import {newBoardSelector, imageModalSelector} from '../../store/reducers/taskReducer'
import { newboardHandler, closeModal, imageModalHandler, imageCloseModal } from '../utilities/methods'
import AddImageModal from '../utilities/add-image-modal'

type Props = {
    children: JSX.Element
}

const HeaderPageLayout = ({children}:Props) => {
  const [imageClickedID, setImageClickedID] = useState('')
    const dispatch = useDispatch()
    const showNewBoard = useSelector(newBoardSelector)
    const showImageModal = useSelector(imageModalSelector)

  const closeModalFunction = () => closeModal(dispatch)
  const newboardHandlerFunction = () => newboardHandler(dispatch)
  const imageModalHandlerFunction = (id:string) => {
    setImageClickedID(id)
    imageModalHandler(dispatch)
  }
  const imageCloseModalFunction = ()=> imageCloseModal(dispatch)
  return (
    <>
    {showNewBoard && <CreateTaskCard closeModal={closeModalFunction} />}
    {showImageModal && <AddImageModal imageCloseModal = {imageCloseModalFunction} idx={imageClickedID}/>}
    <div onClick={showNewBoard ? closeModalFunction : showImageModal ? imageCloseModalFunction : ()=>{}}>
      <div className={showNewBoard || showImageModal ? `${classes['dashboard-section-blur']} ${classes['dashboard-section-pointer']}` : `${classes['dashboard-section']}`}>
            {cloneElement(children, {newboardHandler:newboardHandlerFunction, imageModalHandler:imageModalHandlerFunction})}
        </div>
    </div>
    </>
  )
}

export default HeaderPageLayout