import { ActionTypes } from '../actions/actionTypes'
import {RootState} from './index'
import {Action} from '../actions/actionsTsTypes'

type InitialState = {
    user_id: string,
    displayName : string
    userLogged?:boolean
}

const initialState : InitialState = {
   user_id: localStorage.getItem('token') || '',
   displayName: localStorage.getItem('displayName') || ''
}

const authReducer = (state = initialState, action:Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN :
            localStorage.setItem('displayName', action.payload?.displayName || '')
            localStorage.setItem('token', action.payload?.userInfo.oauthAccessToken || '')
            
            return {
                ...state,
                user_id:  action.payload?.userInfo.oauthAccessToken,
                displayName: action.payload?.displayName,
                expiresIn: action.payload?.userInfo.oauthExpireIn
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
export const displayNameSelector = (state:RootState) => state.authReducer['displayName'] 
export const isUserLogged = (state:RootState) => state.authReducer['userLogged'] 
export default authReducer