import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer } from "./reducers-v1/todolist-reducer";
import {tasksReducer} from "./reducers-v1/task-reducer";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "@redux-devtools/extension";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./sagas/deleteTodoSaga";
import { catchUIReducer } from "./reducers-v1/catch-ui-reducer";

const sagaMiddleWare = createSagaMiddleware()


export const rootReducer = combineReducers({
    todos: todolistReducer,
    tasks: tasksReducer,
    ui: catchUIReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk,
            sagaMiddleWare
        )
    )
)

sagaMiddleWare.run(rootSaga)

