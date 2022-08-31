import { ActionTypes } from './actionTypes'
import axios from 'axios'
import { API } from './apis'
import { Action } from './actionsTsTypes'
import { Dispatch } from 'redux'
import { taskTileDataFormatType } from '../../components/utilities/constants'
import { db, storage } from '../../Firebase'
import { ref, onValue, remove, update} from 'firebase/database'
import { ref as refStorage, uploadBytes, getDownloadURL, listAll,deleteObject } from "firebase/storage"

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

export const login = (userInfo:{}, user_id: string, displayName: string ) => {
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

  //action creators 

  //Read Data

  export const fetchData = () => async(dispatch: Dispatch<Action>) => {

    dispatch({
      type: ActionTypes.IS_LOADING
    })
    const imageUrls:any = []
    const imageListRef = refStorage(storage, 'images/')

    const fetchingImages = await listAll(imageListRef)
    fetchingImages.items.forEach(async(item)=> {
      const url = await getDownloadURL(item)
      imageUrls.push(url)
    })
    try{
        onValue(ref(db),async(snapshot)=>{
        let array: Array<any> = []
        const data = await snapshot.val()
         for(const key in data?.boards){
            let tempObj = {bEKey: key, ...data?.boards[key].boardData}
            imageUrls.length && imageUrls.forEach((item:string) => {
              if (item.includes(tempObj.idx)){
                tempObj = {...tempObj, image: item}
              }
            })
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
      const data = await axios.post(API, {boardData})
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
      const desertRef = refStorage(storage, `images/${id}`)
      const deleteImage = await deleteObject(desertRef)
      
      dispatch({type: ActionTypes.FORMDATADELETE,
        payload: updatedArray
      })

      
    } catch (e) {
      console.log(e, 'error')
      
    }

  }

  //Update
 //Add Post
  export const addPostToBoard = (id:string, post: string, newPostTime:string)=> (dispatch: Dispatch<Action>, getState: () => any) =>{
    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    if(addedPostObj && addedPostObj.posts){
      addedPostObj.posts.push(post)
    }else{
      addedPostObj.posts = [post]
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
    if(image === null) return 
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    try{
      const imageRef = refStorage(storage,`images/${id}`)
      const uploadingImage = await uploadBytes(imageRef,image)
      const url = await getDownloadURL(uploadingImage.ref)
      addedPostObj.image = url
      
      genericPostFunction(dispatch, addedPostObj)

    }catch(e) {console.log(e, 'image upload Issue')}
  }
  // Remove Post
  export const removePostFromBoard = (id:string,updatedPosts:string[])=> (dispatch: Dispatch<Action>, getState: () => any) =>{
    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    addedPostObj.posts = updatedPosts

    genericPostFunction(dispatch, addedPostObj)
  }

  //Generic Update Function

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
  // other methods
    // const dashboarddata = await axios.get(API)
      // for(const key in dashboarddata.data){
      //     tempObj = {bEKey: key, ...dashboarddata.data[key].boardData}
      //     array.push(tempObj)
      //    }