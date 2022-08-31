
import {ActionTypes} from '../actions/actionTypes'
import {RootState} from './index'

type InitialState = {
    showNewBoard: boolean,
    showImageModal: boolean
}

type Action = {
    type: string,
    payload?: boolean
}

const initialState : InitialState  = {
    showNewBoard: false,
    showImageModal: false
}

const taskReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionTypes.SHOW_BOARD:
            return {
                ...state,
                showNewBoard: action.payload
            }
        case ActionTypes.SHOW_IMAGE_MODAL:
                return {
                    ...state,
                    showImageModal: action.payload
                }
        default:
            return state
    }

}

export const newBoardSelector = (state: RootState) => state.task['showNewBoard']
export const imageModalSelector = (state: RootState) => state.task['showImageModal']
export default taskReducer