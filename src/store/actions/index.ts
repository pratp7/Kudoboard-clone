import { ActionTypes } from './actionTypes'
import axios from 'axios'
import { Api } from './http-url'
import { Action } from './actionsTsTypes'
import { Dispatch } from 'redux'

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

  export const formDataArrayTaskDelete = (formData:{}[])=> {
    return {
      type: ActionTypes.FORMDATAUPDATE,
      payload: formData
    }
  }

  export const getIDtoViewBoard = (id:number)=>{
    return {
      type:ActionTypes.GET_ID_TO_VIEW_BOARD,
      payload: id
    }
  }

  export const addPostToBoard = (id:number, post: string,newPostTime:string) =>{
    return {
      type: ActionTypes.ADDPOSTTOBOARD,
      payload:{id, post, newPostTime}
    }
  }

  export const removePostFromBoard = (id:number,updatedPosts:string[])=> {
    return {
      type: ActionTypes.REMOVEPOSTFROMBOARD,
      payload:{id,updatedPosts}
    }
  }

  //action creators 

  export const fetchData = () => async(dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.IS_LOADING
    })
    let array = []
    console.log('checking')
    try{
      const res = await axios.get(Api)
      for(const key in res?.data){
        let tempObj = {idx:key,...res?.data[key].boardData }
        array.push(tempObj)
      }
      console.log(array, 'array----------')
      dispatch({
        type:ActionTypes.FETCH_DATA,
        payload: array
      })


    }catch(e) {
      console.log(e)
    }

  }

  export const sendData = (boardData: {}) => async(dispatch: Dispatch<Action>)=> {
    dispatch({
      type: ActionTypes.IS_LOADING
    })
    console.log('senddata')
    try{
      const data = await axios.post(Api, {boardData})
      if(data.status === 200){
        dispatch({
          type: ActionTypes.FORMDATA,
          payload: boardData
        })
       
      }

    }catch(e){
      console.log(e)
    }
    
  }

  // export const addPostToBoard = (id:number, post: string,newPostTime:string)=> async(dispatch: Dispatch<Action>) =>{

   
  //   try{
  //     const data = await axios.post(Api, {})
  //   }catch (e){console.log(e)}

  //   dispatch( {
  //     type: ActionTypes.ADDPOSTTOBOARD,
  //     payload:{id, post, newPostTime}
  //   })
  // }