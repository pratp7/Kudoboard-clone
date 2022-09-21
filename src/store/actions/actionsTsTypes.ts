import { ActionTypes } from './actionTypes'
import {taskTileDataFormatType} from '../../components/utilities/constants'


interface ShowNewBoardAction {
    type: ActionTypes.SHOW_BOARD,
    payload: boolean
}

interface Login {
    type: ActionTypes.LOGIN,
    payload: {userInfo:any, user_id: string, displayName: string}

}
interface Logout {
    type: ActionTypes.LOGOUT,
}

interface FormDataSave {
    type: ActionTypes.FORMDATA,
    payload: taskTileDataFormatType

}
interface FormDataArrayTaskDelete {
    type: ActionTypes.FORMDATADELETE,
    payload: {}

}
interface GetIDtoViewBoard {
    type: ActionTypes.GET_ID_TO_VIEW_BOARD
    payload: {}

}
interface ADDREMOVEPOSTTOBOARD {
    type: ActionTypes.ADDREMOVEPOSTTOBOARD
    payload: taskTileDataFormatType

}

interface FetchAction {
    type: ActionTypes.FETCH_DATA,
    payload: {}[]
}

interface IsLoading {
    type: ActionTypes.IS_LOADING
}

interface AddImageToBoard{
    type: ActionTypes.ADDIMAGETOBOARDLOADER,
    payload: string
}




export type Action =  ShowNewBoardAction |Login|Logout|FormDataSave|FormDataArrayTaskDelete|GetIDtoViewBoard|ADDREMOVEPOSTTOBOARD|FetchAction|IsLoading|AddImageToBoard