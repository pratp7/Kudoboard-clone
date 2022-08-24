import { ActionTypes } from '../actions/actionTypes'
import {RootState} from './index'
import {Action} from '../actions/actionsTsTypes'

type InitialState = {
    user_id: string,
    userInfo: {},
    displayName : string
    userLogged?:boolean
}

const initialState : InitialState = {
   user_id: localStorage.getItem('user_id') || '',
   userInfo: {},
   displayName: localStorage.getItem('displayName') || ''
}

const authReducer = (state = initialState, action:Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN :
            localStorage.setItem('user_id', action.payload?.user_id || '')
            localStorage.setItem('displayName', action.payload?.displayName || '')
            return {
                ...state,
                user_id: action.payload?.user_id,
                userInfo: action.payload?.userInfo,
                displayName: action.payload?.displayName
            }
        case ActionTypes.LOGOUT :
            localStorage.clear()
            return {
                ...state,
                user_id: '',
                userInfo: {},
                displayName: ''
            }
        default:
            return state
    }
    

}
export const userSelector = (state:RootState) => state.authReducer['user_id'] 
export const userInfoSelector = (state:RootState) => state.authReducer['userInfo'] 
export const displayNameSelector = (state:RootState) => state.authReducer['displayName'] 
export const isUserLogged = (state:RootState) => state.authReducer['userLogged'] 
export default authReducer