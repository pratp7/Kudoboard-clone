import React, { useEffect, useState, useCallback } from 'react'
import './utilities.css'
import closeIcon from '../../images/closeicon.png'
import classes from '../create-board/create-board.module.css'
import {useDropzone} from 'react-dropzone'
import {bindActionCreators} from 'redux'
import {addImageToBoard} from '../../store/actions'
import {useDispatch} from 'react-redux'

type Props = {
  imageCloseModal:()=> void,
  idx:string
}

const AddImageModal = ({imageCloseModal, idx}:Props) => {
  const [imageUpload, setImageUpload] = useState<any>(null)
  const [showSelectedImage, setShowSelectedImage] = useState<any>([])
  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({multiple: false, noClick:true})
  const dispatch = useDispatch()
  const addImageToBoardFunc = bindActionCreators(addImageToBoard, dispatch)

  const saveImageHandler = ():void=> {
    addImageToBoardFunc(idx, imageUpload)
    imageCloseModal()
  
   } 

  const removeImage = ():void => {
    setShowSelectedImage([])
  }

  useEffect(()=>{
    let addImage = acceptedFiles.map((file)=> (
      <section key={file.name} >
      <div className='close-icon-image-section'><img src={closeIcon} alt="remove-image" onClick={removeImage} /></div>
      <div className='selected-Image-Preview'>
       <img src={URL.createObjectURL(file)} alt={file.name} />
      </div>
      </section>
    ))
    setImageUpload(acceptedFiles[0])  
    setShowSelectedImage(addImage)
  } , [acceptedFiles])


  return (
    <div className='image-modal-parent'>
    <div className='image-modal-main-section'>
      <nav className='nav-close-modal'>
        <img src={closeIcon} alt="close-icon" onClick={imageCloseModal} />
      </nav>
      <header className='header-info'>
      <hr />
        <h3>Change Board Hover Cover Image</h3>
        <p>Add the Image to your Board.</p>
        <hr />
      </header>
      <h4 className='image-header'>Image</h4>
      {!showSelectedImage.length ? <section className='image-dialog-box' {...getRootProps()}>
        <input {...getInputProps()}/>
        <p>Drag image here to upload</p>
        <p></p>
        <button type="button" onClick={open} className='select-image'>
         Or Select File
        </button>
      </section> : showSelectedImage}
     
      <section className='buttons-modal-section'>
        <button className={showSelectedImage.length ? classes['post-button'] : 'disabled-button'} onClick={saveImageHandler} disabled={!showSelectedImage.length}>Save Cover Image</button>
        <button className={classes['discard-button']} onClick={imageCloseModal}>Cancel</button>

      </section>
    </div>
    </div>
  )
}

export default AddImageModal