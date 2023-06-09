import {applyMiddleware, combineReducers, createStore} from "redux";
import {cashReducer} from "./cash-reducer";
import {customerReducer} from "./customers-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import {countWatcher} from "../Saga/CountSaga";
import {rootWatcher} from "../Saga/Saga"; // - Midleware - это некий слой который может
// задиспачить функцию

const sagaMiddleware = createSagaMiddleware();


// Reducer - отправлять - это просто javascript функции которая первым параметром приимает
// state а затем action


const rootReducer = combineReducers({
    Cash: cashReducer,
    Customers: customerReducer,
}) // combine reducer принимает в себя редукторы

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);
// Store - первым парметром принимает reducer а вторым ...
// У store есть три метода такие как:
// 1 - getState получить состояние
// 2 - dispatch изменить состояние
// 3 - subscribe подписаться на изменеия в состоянии
sagaMiddleware.run(rootWatcher) // -здесь я вызывваю сагу

