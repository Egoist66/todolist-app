import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./reducers/todolist-reducer";
import {tasksReducer} from "./reducers/task-reducer";
import thunk, {ThunkAction} from 'redux-thunk'
import {composeWithDevTools} from "@redux-devtools/extension";
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./sagas/deleteTodoSaga";
import {catchUIReducer} from "./reducers/catch-ui-reducer";
import {ActionTasksTypes} from "./actions/tasks-actions";
import {ActionTodosTypes} from "./actions/todos-actions";
import {AppRootState} from "../hooks/useStore";
import {PreloadedStore} from "../hooks/PreloadedStore";
import {appReducer} from "./reducers/app-reducer";
import {AppStatusActions} from "./actions/app-actions";
import {AppDevModeAction, AppDevModeReducer, setDevMode} from "./reducers/app-devmode-reducer";
import {loginReducer} from "./reducers/login-reducer";

const {preloadStore, persist} = PreloadedStore()
const sagaMiddleWare = createSagaMiddleware()


export const rootReducer = combineReducers({
    todos: todolistReducer,
    tasks: tasksReducer,
    ui: catchUIReducer,
    app: appReducer,
    appDev: AppDevModeReducer,
    auth: loginReducer

})


const preloadedState: () => AppRootState = preloadStore('root')
export const store = legacy_createStore(
    rootReducer,
    preloadedState(),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            sagaMiddleWare
        )
    )
)
store.subscribe(() => {
    persist('root', store)
});

store.dispatch(setDevMode(false))

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