import {RootState} from './index'
import { ActionTypes} from '../actions/actionTypes'
import { taskTileDataFormatType } from '../../components/utilities/constants'
import update from 'react-addons-update'
import {Action} from '../actions/actionsTsTypes'


type InitialState = {
    formData: {},
    formDataArray: taskTileDataFormatType[]
    isLoading?: boolean,
    getID: string,
    isAddImageLoading:{}
} 

const pathname = window.location.pathname.split('/')

const initialState :InitialState = {
    formData: {},
    formDataArray: [],
    isLoading: false,
    getID:pathname[pathname.length-1],
    isAddImageLoading: {}

}


const dataReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case ActionTypes.FORMDATA:
            return {
                ...state,
                formData:action.payload,
                getID: action.payload.idx,
                isLoading:false
            }
        case ActionTypes.FORMDATADELETE:
            return {
                ...state,
                formDataArray: action.payload
            }
        case ActionTypes.GET_ID_TO_VIEW_BOARD: 
            return {
                ...state,
                getID:action.payload
            }
        case ActionTypes.ADDREMOVEPOSTTOBOARD:
            const findIndex = state.formDataArray.findIndex(item=> item.idx === action.payload.idx)
            return update(state, {
                formDataArray:{
                    [findIndex]:{$set: action.payload}
                },
                isAddImageLoading: {
                    idx: {$set: ''},
                    status: {$set: false}
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
        case ActionTypes.ADDIMAGETOBOARDLOADER:
                return {
                    ...state,
                    isAddImageLoading: {idx: action.payload, status: true}
                        
                }
        
        default:
            return state
    }

} 

export const formDataSelector = (state: RootState) => state.dataReducer['formData']
export const formDataArraySelector = (state: RootState) => state.dataReducer['formDataArray']
export const getIdSelector = (state:RootState) => state.dataReducer['getID']
export const isLoaderSelector = (state:RootState) => state.dataReducer['isLoading']
export const isAddImageLoaderSelector = (state:RootState) => state.dataReducer['isAddImageLoading']
export default dataReducer