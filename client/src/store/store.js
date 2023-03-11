import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore (
    reducer, 
//	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancer(applyMiddleware(thunkMiddleware)) // Esta linea es para que le podamos hacer peticiones a un servidor
)

export default store