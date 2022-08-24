import React from 'react'
import classes from './create-board.module.css'

type Props = {
    post: string,
    displayName: string,
    removePostHandler: (id:number)=> void,
    idx:number
}

const AddedCardPost = ({post, displayName, removePostHandler, idx}:Props) => {
  return (
    <>
    <div className={classes['added-post-main-section']}>
        <section>
        <h3>{post}</h3>
        <p>From {displayName}</p>
        </section>
        <span className={classes['cross-icon']} onClick={()=>removePostHandler(idx)}>X</span>
    </div>
    </>
  )
}

export default AddedCardPost