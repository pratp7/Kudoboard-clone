
import {ActionTypes} from '../actions/actionTypes'
import {RootState} from './index'

type InitialState = {
    showNewBoard: boolean
}

type Action = {
    type: string,
    payload?: boolean
}

const initialState : InitialState  = {
    showNewBoard: false
}

const taskReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionTypes.SHOW_BOARD:
            return {
                ...state,
                showNewBoard: action.payload
            }
        default:
            return state
    }

}

export const newBoardSelector = (state: RootState) => state.task['showNewBoard']
export default taskReducer