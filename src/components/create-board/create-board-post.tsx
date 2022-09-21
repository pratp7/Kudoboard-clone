import React, {useEffect, useState} from 'react'
import classes from './create-board.module.css'
import { getIdSelector } from '../../store/reducers/datareducer'
import { useSelector, useDispatch } from 'react-redux'
import { addPostToBoard } from '../../store/actions'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import {useDropzone, FileWithPath} from 'react-dropzone'


type Props = {
  addPostHandler: (condition:boolean)=> void
}

const CreateBoardPost = ({addPostHandler}:Props) => {
  const [message, setMessage] = useState('')
  const [uploadImage, setUploadImage] = useState<any>(null)
  const boardID = useSelector(getIdSelector)
  const dispatch = useDispatch()
  const addPostToBoardFunc = bindActionCreators(addPostToBoard, dispatch)
  const {acceptedFiles, open } = useDropzone({multiple: false, noClick:true})


  useEffect(()=>{
    if(acceptedFiles?.length){
      setUploadImage(acceptedFiles[0])
    }else{
      setUploadImage(null)
    }
  }, [acceptedFiles])

  const postData = ():void => {
    let newPostCreatedDate = moment(new Date()).format('LTS')
    if(uploadImage){
      addPostToBoardFunc(boardID, message, `${newPostCreatedDate} - ${new Date().toLocaleDateString()}`, uploadImage)
    }else{
      addPostToBoardFunc(boardID, message, `${newPostCreatedDate} - ${new Date().toLocaleDateString()}`)
    }
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
        <button type="button" onClick={open} className={classes['post-button']}> Add Image </button>
        {acceptedFiles?.length ? acceptedFiles.map((file:FileWithPath)=> <span key={file.name}>{file.path}</span>): null}
      </header>
      <section className={classes['text-area-section']}>
        <textarea name='post area' id='post area' required value={message} onChange={messageHandler}></textarea>
      </section>
      <section className={classes['button-board-section']}>
        {message && <button className={classes['post-button']} onClick={postData} disabled={message===''}>Post</button>}
        <button className={classes['discard-button']} onClick={discardPost}>Discard Post</button>
      </section>
    </div>
  )
}

export default CreateBoardPost