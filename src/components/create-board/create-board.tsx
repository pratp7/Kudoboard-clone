import React, {useState} from 'react'
import classes from '../css/createTask.module.css'
import HeaderTask from '../create-task/Header-Task'
import CreateBoardPost from './create-board-post'
import AddedCardPost from './added-post-card'
import { useDispatch } from 'react-redux'
import {removePostFromBoard} from '../../store/actions'
import { bindActionCreators } from 'redux'


type Props = {
    newboardHandler?: () => void,
    title:string,
    posts: {post:string, image: string}[],
    displayName: string,
    getID: string
}

const CreateBoard = ({newboardHandler = ()=>{}, title='', posts=[], displayName, getID}: Props) => {
  const [showPostCard, setShowPostCard] = useState(false)
  const dispatch=useDispatch()
  const removePostFromBoardFunc = bindActionCreators(removePostFromBoard, dispatch)

  const addPostHandler = (condition:boolean):void => {
    setShowPostCard(condition)

  }
  const removePostHandler = (id:number) : void => {
    const updatedPosts = posts.filter((item, idx) => idx !==id)
    removePostFromBoardFunc(getID, updatedPosts)
    
  }
  return (
    <>
    {showPostCard && <CreateBoardPost addPostHandler={addPostHandler}/>}
    <div className={showPostCard ?`${classes['dashboard-section-blur']} ${classes['dashboard-section-pointer']}` : `${classes['dashboard-section']}`}>
      <HeaderTask newboardHandler={newboardHandler} />
         <div className={classes['board-section']}>
        <header className={classes['board-header']}>
            <h1>{title}</h1>
            <button className={posts.length<10 ? classes['add-to-board']:`${classes['noHover']}`} onClick={()=>addPostHandler(true)} disabled={posts.length >= 10}>
              {posts.length>=10 ? 'Maximum Post Limit Exceeded': '+ Add to Board '}
            </button>    
        </header>
        <section className={classes['card-post-section']}>
          {posts && posts.length ? posts.map((item, idx)=> {
            return  <AddedCardPost post={item?.post} key={idx} displayName={displayName} idx={idx} removePostHandler={removePostHandler} image={item?.image}/>
          }): null}
        
      </section>
   
    </div>
  </div>
    </>
  )
}

export default CreateBoard