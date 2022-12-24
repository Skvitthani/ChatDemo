import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducer from ".";


export const myStore = createStore(appReducer, {}, applyMiddleware(thunk));

// export const myStore = createStore(Reducers)