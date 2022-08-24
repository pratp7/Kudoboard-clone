import { ActionTypes } from './actionTypes'


interface ShowNewBoardAction {
    type: ActionTypes.SHOW_BOARD,
    payload: boolean
}

interface Login {
    type: ActionTypes.LOGIN,
    payload: {userInfo:{}, user_id: string, displayName: string}

}
interface Logout {
    type: ActionTypes.LOGOUT,
}

interface FormDataSave {
    type: ActionTypes.FORMDATA,
    payload: {}

}
interface FormDataArrayTaskDelete {
    type: ActionTypes.FORMDATAUPDATE,
    payload: {}

}
interface GetIDtoViewBoard {
    type: ActionTypes.GET_ID_TO_VIEW_BOARD
    payload: {}

}
interface AddPostToBoard {
    type: ActionTypes.ADDPOSTTOBOARD
    payload: {id:number, post: string,newPostTime:string}

}
interface RemovePostFromBoard {
    type: ActionTypes.REMOVEPOSTFROMBOARD
    payload: {id:number,updatedPosts:string[]}

}

interface FetchAction {
    type: ActionTypes.FETCH_DATA,
    payload: {}[]
}

interface IsLoading {
    type: ActionTypes.IS_LOADING
}





export type Action =  ShowNewBoardAction |Login|Logout|FormDataSave|FormDataArrayTaskDelete|GetIDtoViewBoard|AddPostToBoard|RemovePostFromBoard|FetchAction|IsLoading