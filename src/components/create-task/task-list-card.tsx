import React from 'react'
import classes from '../css/createTask.module.css'
import defaultImage from '../../images/defaultListImage.png'
import {forUserType} from '../utilities/constants'
type Props = {
  idx: number,
  title: string, 
  forUser: forUserType[], 
  creator: string, 
  created: string, 
  posts: {}[],
  lastPostCreated: string
  viewBoardHandler: (id:number)=> void,
  deleteBoardHandler: (id:number)=> void

}
const TaskListCard = ({title, forUser, creator, created, posts, idx,lastPostCreated, viewBoardHandler, deleteBoardHandler}:Props) => {
  return (
    <div className={classes['task-list-card']}>
     <figure className={classes['task-list-image']}>
      <img src={defaultImage} alt='img' />
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
        <p>{posts && posts.length} (Max of 10)</p>
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