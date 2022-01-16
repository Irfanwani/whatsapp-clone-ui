import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from './errorReducer'
import roomReducer from './roomReducer'

export default combineReducers({
    authReducer,
    errorReducer,
    roomReducer
})