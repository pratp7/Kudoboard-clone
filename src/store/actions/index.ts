import { ActionTypes } from './actionTypes'
import axios from 'axios'
import { Api } from './http-url'
import { Action } from './actionsTsTypes'
import { Dispatch } from 'redux'
import { taskTileDataFormatType } from '../../components/utilities/constants'
import { db } from '../../Firebase'
import { ref, onValue, remove, update,child, push } from 'firebase/database'

export const showNewBoardAction = (value: boolean) => {
    return {
        type: ActionTypes.SHOW_BOARD,
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

  export const fetchData = () => async(dispatch: Dispatch<Action>, getState: () => any) => {
    const userDisplayName = getState().authReducer['displayName']
    dispatch({
      type: ActionTypes.IS_LOADING
    })
    let array: Array<any> = []
    try{
      onValue(ref(db),(snapshot)=>{
        const data = snapshot.val()
         for(const key in data?.boards){
        let tempObj = {bEKey: key, ...data?.boards[key].boardData, creator:userDisplayName}
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
      const data = await axios.post(Api, {boardData})
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

      dispatch({type: ActionTypes.FORMDATADELETE,
        payload: updatedArray
      })

      
    } catch (e) {
      console.log(e, 'error')
      
    }

  }

  //Update

  export const addPostToBoard = (id:string, post: string, newPostTime:string)=> async(dispatch: Dispatch<Action>, getState: () => any) =>{
    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    if(addedPostObj.posts){
      addedPostObj.posts.push(post)
    }else{
      addedPostObj.posts = [post]
    }
    addedPostObj.lastPostCreated = newPostTime
    try{
      update(ref(db, `boards/${addedPostObj.bEKey}/boardData`),{...addedPostObj})
        dispatch({
          type: ActionTypes.ADDPOSTTOBOARD,
          payload: addedPostObj
        })
    }catch (e){console.log(e, 'error')}
  }

  export const removePostFromBoard = (id:string,updatedPosts:string[])=> async(dispatch: Dispatch<Action>, getState: () => any) =>{
    let fetchedArray = getState().dataReducer['formDataArray']
    const addedPostObj = fetchedArray.filter((item:{idx:string}) => item.idx === id)[0]
    addedPostObj.posts = updatedPosts

  

    try {
      update(ref(db, `boards/${addedPostObj.bEKey}/boardData`),{...addedPostObj})
      dispatch({
        type: ActionTypes.ADDPOSTTOBOARD,
        payload: addedPostObj
      })
      
    } catch (error) {
      console.log(error, 'error')
    }
  }
