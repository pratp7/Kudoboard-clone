import {RootState} from './index'
import { ActionTypes} from '../actions/actionTypes'
import { taskTileDataFormatType } from '../../components/utilities/constants'
import update from 'react-addons-update'
import {Action} from '../actions/actionsTsTypes'


type InitialState = {
    formData: {},
    formDataArray: taskTileDataFormatType[]
    isLoading?: boolean,
    getID: number
} 

const initialState :InitialState = {
    formData: {},
    formDataArray: [],
    isLoading: false,
    getID:-1,

}


const dataReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionTypes.FORMDATA:
            let newArray = [...state.formDataArray, {idx1:state.formDataArray.length,...action.payload}]
            console.log(newArray, 'new array')
            return {
                ...state,
                formData:action.payload,
                formDataArray: newArray,
                getID: newArray.length-1,
                isLoading:false
            }
        case ActionTypes.FORMDATAUPDATE: 
            return {
                ...state,
                formDataArray: action.payload
            }
        case ActionTypes.GET_ID_TO_VIEW_BOARD: 
            return {
                ...state,
                getID:action.payload
            }
        case ActionTypes.ADDPOSTTOBOARD:
            const {id, post, newPostTime} = action.payload
            return update(state, {
                formDataArray:{
                    [id]:{
                        posts:{$set:[...state.formDataArray[id].posts,post]},
                        lastPostCreated:{$set:newPostTime}
                    }
                }
            })
        case ActionTypes.REMOVEPOSTFROMBOARD:
                return update(state, {
                    formDataArray:{
                        [action.payload.id]:{
                            posts:{$set:action.payload.updatedPosts}
                        }
                    }
                })
        case ActionTypes.FETCH_DATA:
            return {
                ...state,
                formDataArray: action.payload,
                isLoading:false
                
            }
        case ActionTypes.IS_LOADING:
                return {
                    ...state,
                    isLoading: true
                    
                }
        default:
            return state
    }

} 

export const formDataSelector = (state: RootState) => state.dataReducer['formData']
export const formDataArraySelector = (state: RootState) => state.dataReducer['formDataArray']
export const getIdSelector = (state:RootState) => state.dataReducer['getID']
export const isLoaderSelector = (state:RootState) => state.dataReducer['isLoading']
export default dataReducer