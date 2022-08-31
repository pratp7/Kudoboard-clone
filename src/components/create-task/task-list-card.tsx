import React from 'react'
import classes from '../css/createTask.module.css'
import defaultImage from '../../images/defaultListImage.png'
import {forUserType} from '../utilities/constants'
import editIcon from '../../images/edit-icon.png'
import Loader from '../utilities/Loader'
type Props = {
  idx: string,
  title: string, 
  forUser: forUserType[], 
  creator: string, 
  created: string, 
  posts: {}[],
  lastPostCreated: string,
  image: string
  viewBoardHandler: (id:String)=> void,
  deleteBoardHandler: (id:String)=> void,
  editClickHandler: (id:String) => void,
  isImageLoading: {status: boolean, idx: string}

}
const TaskListCard = ({title, forUser, creator, created, posts, idx,lastPostCreated,image,isImageLoading, viewBoardHandler, deleteBoardHandler, editClickHandler}:Props) => {
  return (
    <div className={classes['task-list-card']}>
     <figure className={classes['task-list-image']}>
     {isImageLoading && isImageLoading.idx === idx && isImageLoading.status ?  <Loader/>: <img src={image || defaultImage} alt={title} />}
     <figure className={classes['task-list-image-edit-icon']} onClick={() => editClickHandler(idx)}>
      <img src={editIcon} alt='edit--icons' />
     </figure>
     </figure>
     <section>
      <header className={classes['task-list-header']}>
      <h2>{title}</h2>
      <div>
        <button  className={classes['view-board']} onClick={() => viewBoardHandler(idx)}>View Board</button>
        <button className={classes['delete-board']} onClick={()=> deleteBoardHandler(idx)}>Delete Board</button>
      </div>
      </header>
      <section className={classes['task-list-section']}>
        <p>For {forUser && forUser.length && forUser.map((item, idx) => <span key={item.idx}>{item.firstName} {item.lastName} {idx!== forUser.length-1 && ',' } </span>)} </p>
        <p>MINI Board</p>
      </section>
      <hr />
      <section className={classes['task-list-section']}>
        <div>
        <p>CREATOR</p>
        <p>{creator}</p>
        </div>
        <div>
        <p>CREATED</p>
        <p>{created}</p>
        </div>
      </section>
      <section className={classes['task-list-section']}>
        <div>
        <p>POSTS </p>
        <p>{posts && posts.length || 0} (Max of 10)</p>
        </div>
        <div>
        <p>LAST POST ADDED</p>
        <p>{lastPostCreated || 'N/A'}</p>
        </div>
      </section>
    </section>
    </div>
  )
}

export default TaskListCard