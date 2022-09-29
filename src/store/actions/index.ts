import { ActionTypes } from './actionTypes'
import axios from 'axios'
import { Action } from './actionsTsTypes'
import { Dispatch } from 'redux'
import { taskTileDataFormatType } from '../../components/utilities/constants'
import { db, storage } from '../../Firebase'
import { ref, onValue, remove, update} from 'firebase/database'
import { ref as refStorage, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage"
import { signInwithGoogle } from '../../Firebase'
import { bindActionCreators } from 'redux'
import { NavigateFunction } from 'react-router-dom'


export const showNewBoardAction = (value: boolean) => {
    return {
        type: ActionTypes.SHOW_BOARD,
        payload: value
    }
}

export const showImageModalAction = (value: boolean) => {
  return {
      type: ActionTypes.SHOW_IMAGE_MODAL,
      payload: value
  }
}

const login = (userInfo:{}, user_id: string, displayName: string ) => {
    return {
      type: ActionTypes.LOGIN,
      payload: {userInfo, user_id, displayName}
    }
  }
  
  export const logout = () => {
    return {
      type: ActionTypes.LOGOUT
    }
  }

  export const getIDtoViewBoard = (id:string)=>{
    return {
      type:ActionTypes.GET_ID_TO_VIEW_BOARD,
      payload: id
    }
  }

  //login action 

  export const loginAction = (navigate: NavigateFunction) => (dispatch: Dispatch<Action>) => {
    const loginFunc = bindActionCreators(login, dispatch)
    signInwithGoogle().then((res:any) => {
      loginFunc(res._tokenResponse, res._tokenResponse.email, res._tokenResponse.displayName)
      navigate('/dashboard')
    }).catch((error) => {
      console.log(error.message)
    })

  }

  //action creators 

  //Read Data

  export const fetchData = () => async(dispatch: Dispatch<Action>) => {

    dispatch({
      type: ActionTypes.IS_LOADING
    })
    // const imageUrls:any = []
    // const imageListRef = refStorage(storage, 'images/')

    // const fetchingImages = await listAll(imageListRef) //import listAll from firabase storage
    // fetchingImages.items.forEach(async(item)=> {
    //   const url = await getDownloadURL(item)
    //   imageUrls.push(url)
    // })
    try{
        onValue(ref(db),async(snapshot)=>{
        let array: Array<any> = []
        const data = await snapshot.val()
         for(const key in data?.boards){
            let tempObj = {bEKey: key, ...data?.boards[key].boardData}
            // imageUrls.length && imageUrls.forEach((item:string) => {
            //   if (item.includes(tempObj.idx)){
            //     tempObj = {...tempObj, image: item}
            //   }
            // })
            array.push(tempObj)
      }
      dispatch({
        type:ActionTypes.FETCH_DATA,
        payload: array
      })
      })
      
  }catch(e) {
      console.log(e, 'error')
    }

  }
  // Create /Post 
  export const sendData = (boardData: taskTileDataFormatType) => async(dispatch: Dispatch<Action>)=> {
    dispatch({
      type: ActionTypes.IS_LOADING
    })
    try{
      await axios.post(process.env.REACT_APP_API as string, {boardData})
        dispatch({
          type: ActionTypes.FORMDATA,
          payload: boardData
        })
    }catch(e){
      console.log(e, 'error')
    }
    
  }

  //Delete

  export const deleteBoard = (id:string, updatedArray:Array<{}>) => async(dispatch: Dispatch<Action>, getState: () => any) =>{
    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    try {
      remove(ref(db, `boards/${addedPostObj.bEKey}`))
      if(addedPostObj?.image){
        const desertRef = refStorage(storage, `images/${id}`)
        await deleteObject(desertRef)
      }
      
      
      dispatch({type: ActionTypes.FORMDATADELETE,
        payload: updatedArray
      })

      
    } catch (e) {
      console.log(e, 'error')
      
    }

  }

  //Update
 //Add Post
  export const addPostToBoard = (id:string, post: string, newPostTime:string, imageUpload?:any)=> async(dispatch: Dispatch<Action>, getState: () => any) =>{
    dispatch({
      type: ActionTypes.IS_LOADING
    })
    let fetchedArray = getState().dataReducer['formDataArray']
    let url = ''
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    dispatch({
      type: ActionTypes.ADDIMAGETOBOARDLOADER,
      payload: addedPostObj.posts?.length || 0
    })
    if(imageUpload){
    url = await addImageGenericFunction(imageUpload, 'posts', `${id}-${addedPostObj.posts?.length || 0}`) || ''
    }
    if(addedPostObj && addedPostObj.posts){
      addedPostObj.posts.push({post: post, image:url || ''})
    }else{
      addedPostObj.posts = [{post: post, image:url || ''}]
    }
    addedPostObj.lastPostCreated = newPostTime
    genericPostFunction(dispatch, addedPostObj)
  }

  // Add Image
  export const addImageToBoard = (id:string, image:any)=> async(dispatch: Dispatch<Action>, getState: () => any) =>{
    dispatch({
      type: ActionTypes.ADDIMAGETOBOARDLOADER,
      payload: id
    })

    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    let url = await addImageGenericFunction(image, 'images', id)
    addedPostObj.image = url
    genericPostFunction(dispatch, addedPostObj)
  }

  // Remove Post
  export const removePostFromBoard = (id:string,updatedPosts:{}[])=> (dispatch: Dispatch<Action>, getState: () => any) =>{
    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    addedPostObj.posts = updatedPosts

    genericPostFunction(dispatch, addedPostObj)
  }

  //Generic Update Functions

  const genericPostFunction = async (dispatch:Dispatch<Action>, addedPostObj:any) =>{
  try {
    await update(ref(db, `boards/${addedPostObj.bEKey}/boardData`),{...addedPostObj})
      dispatch({
        type: ActionTypes.ADDREMOVEPOSTTOBOARD,
        payload: addedPostObj
      })
      } catch (error) {
          console.log(error, 'error')
      }

  }

  const addImageGenericFunction = async (imageObj: any, folderName: string, id:any) => {
    if(imageObj === null) return 
    try{
      const imageRef = refStorage(storage,`${folderName}/${id}`)
      const uploadingImage = await uploadBytes(imageRef,imageObj)
      const url = await getDownloadURL(uploadingImage.ref)
      return url

    }catch(e) {console.log(e, 'image upload Issue')}
  }
  
  // other methods
    // const dashboarddata = await axios.get(API)
      // for(const key in dashboarddata.data){
      //     tempObj = {bEKey: key, ...dashboarddata.data[key].boardData}
      //     array.push(tempObj)
      //    }