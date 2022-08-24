import { combineReducers } from 'redux'
import taskReducer from './taskReducer'
import authReducer from './authreducer'
import dataReducer from './datareducer'

const reducers = combineReducers({
    task: taskReducer,
    authReducer,
    dataReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>