import React from 'react'
import classes from './create-board.module.css'
import {isAddImageLoaderSelector, isLoaderSelector} from '../../store/reducers/datareducer'
import {useSelector} from 'react-redux'
import Loader from '../utilities/Loader'
type Props = {
    post: string,
    displayName: string,
    removePostHandler: (id:number)=> void,
    idx:number,
    image: string
}

const AddedCardPost = ({post, displayName, removePostHandler, idx, image}:Props) => {
  const isImageLoading = useSelector(isAddImageLoaderSelector)
  const isLoading= useSelector(isLoaderSelector)
  return (
    <>
    {isLoading? <div className={classes['added-post-main-section']}><Loader/></div>:<div className={classes['added-post-main-section']}>
        <section className={classes['post-section']}>
        {isImageLoading && isImageLoading.idx === idx && isImageLoading.status ?  <Loader/>: image && <img src={image} alt={`${idx}`} />}
        <h3>{post}</h3>
        <p>From {displayName}</p>
        </section>
        <span className={classes['cross-icon']} onClick={()=>removePostHandler(idx)}>X</span>
    </div>}
    </>
  )
}

export default AddedCardPost