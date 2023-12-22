import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./reducers-v1/todolist-reducer";
import {tasksReducer} from "./reducers-v1/task-reducer";
import thunk, {ThunkAction} from 'redux-thunk'
import {composeWithDevTools} from "@redux-devtools/extension";
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas/deleteTodoSaga";
import {catchUIReducer} from "./reducers-v1/catch-ui-reducer";
import {ActionTasksTypes} from "./actions/tasks-actions";
import {ActionTodosTypes} from "./actions/todos-actions";
import {AppRootState} from "../hooks/useStore";
import {PreloadedStore} from "../hooks/PreloadedStore";
import {appReducer} from "./reducers-v1/app-reducer";
import {AppStatusActions} from "./actions/app-actions";
import {AppDevModeAction, AppDevModeReducer, setDevMode} from "./reducers-v1/app-devmode-reducer";

const {preloadStore, persist} = PreloadedStore()
const sagaMiddleWare = createSagaMiddleware()


export const rootReducer = combineReducers({
    todos: todolistReducer,
    tasks: tasksReducer,
    ui: catchUIReducer,
    app: appReducer,
    appDev: AppDevModeReducer
})


const preloadedState = preloadStore('root')
export const store = createStore(
    rootReducer,
    preloadedState(),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            sagaMiddleWare
        )
    )
)





store.dispatch(setDevMode(false))
store.subscribe(() => {
    persist('root', store)
})
sagaMiddleWare.run(rootSaga)


export type AppActions = ActionTasksTypes | ActionTodosTypes | AppStatusActions | AppDevModeAction
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootState,
    unknown,
    AppActions
>


//@ts-ignore
window.store = store