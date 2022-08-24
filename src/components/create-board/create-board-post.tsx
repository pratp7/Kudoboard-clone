import React, {useState} from 'react'
import classes from './create-board.module.css'
import { getIdSelector } from '../../store/reducers/datareducer'
import { useSelector, useDispatch } from 'react-redux'
import { addPostToBoard } from '../../store/actions'
import moment from 'moment'
import { bindActionCreators } from 'redux'

type Props = {
  addPostHandler: (condition:boolean)=> void
}

const CreateBoardPost = ({addPostHandler}:Props) => {
  const [message, setMessage] = useState('')
  const boardID = useSelector(getIdSelector)
  const dispatch = useDispatch()
  const addPostToBoardFunc = bindActionCreators(addPostToBoard, dispatch)

  const postData = ():void => {
    let newPostCreatedDate = moment(new Date()).format('LTS')
    addPostToBoardFunc(boardID, message, `${newPostCreatedDate} - ${new Date().toLocaleDateString()}`)
    addPostHandler(false)

  }

  const discardPost = ():void => {
      addPostHandler(false)
  }

  const messageHandler = (e:React.ChangeEvent<HTMLTextAreaElement>):void => {
    setMessage(e.target.value)
  }


  return (
    <div className={classes['create-post-main-section']}>
      <header>
        <h1>Add a Post</h1>
        <section className={classes['add-media-section']}>
          <span>Add Image</span>
          <span>Add Video</span>
        </section>
      </header>
      <section className={classes['text-area-section']}>
        <textarea name='post area' id='post area' required value={message} onChange={messageHandler}></textarea>
      </section>
      <section className={classes['button-board-section']}>
        <button className={classes['post-button']} onClick={postData} disabled={message===''}>Post</button>
        <button className={classes['discard-button']} onClick={discardPost}>Discard Post</button>
      </section>
    </div>
  )
}

export default CreateBoardPost