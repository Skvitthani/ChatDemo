import { combineReducers } from "redux";
import Reducers from "../../reducers/Reducer";

// import userReducer from "../reducer/Reducers"

const appReducer = combineReducers({
  user: Reducers,
});

export default appReducer;
