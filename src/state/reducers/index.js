import { combineReducers } from "redux";
import userReducer from "./userReducer";

const reducers = combineReducers({
    User: userReducer,
});

export default reducers;