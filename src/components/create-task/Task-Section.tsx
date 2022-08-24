import React from 'react'
import '../utilities/utilities.css'
import classes from '../css/createTask.module.css'
import TaskListCard from './task-list-card'
import HeaderTask from './Header-Task'
import {formDataArraySelector} from '../../store/reducers/datareducer'
import {useSelector, useDispatch} from 'react-redux'
import {getIDtoViewBoard, deleteBoard} from '../../store/actions'
import {useNavigate} from 'react-router-dom'
import {bindActionCreators} from 'redux'

type Props = {
    newboardHandler?: () => void
}
const TaskSection = ({newboardHandler = ()=>{}}:Props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formDataArray: Array<any> = useSelector(formDataArraySelector)
    const deleteBoardFunc = bindActionCreators(deleteBoard, dispatch)

    const createNewBoardOnEmptyList : React.ReactNode = (
        <>
        <div className={classes['new-board-list-section']}>Create New Board</div>
        <div className={classes['new-board-list-section']}><button className={classes['new-board-style']} onClick= {newboardHandler} >Create New Board</button></div>
        </>
    )

    const viewBoardHandler = (id:string):void =>{
        dispatch(getIDtoViewBoard(id))
        navigate(`/dashboard/createboard/${id}`)
    }
    const deleteBoardHandler = (id:string):void => {
        const newArray = formDataArray.filter((item) => item.idx !== id)
        deleteBoardFunc(id, newArray)

    }
  return (
    <>
     <HeaderTask newboardHandler={newboardHandler} />
      <hr />
    <div>
        <div className={classes['dashboard']}>
            <h1>Dashboard</h1>
            <button className={classes['new-board-style']} onClick= {newboardHandler} >+ New Board</button>
        </div>
        <section className={classes['list-section']}>
            {formDataArray.length ? formDataArray.map((item, idx) => {
                return <TaskListCard {...item} key={idx} idx={item.idx} viewBoardHandler={viewBoardHandler} deleteBoardHandler={deleteBoardHandler}/>
            }):createNewBoardOnEmptyList}
        </section>
    </div>
    </>
  )
}

export default TaskSection