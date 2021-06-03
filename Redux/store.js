import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import workout from "./Reducers/workoutReducer";

const reducers = combineReducers({
    workout,
});

const store = createStore(reducers);

export default store;
