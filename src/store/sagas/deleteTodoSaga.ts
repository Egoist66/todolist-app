import {all, call, delay, put, takeEvery} from 'redux-saga/effects'
import {todoListAPI} from '../../api/todo-lists-api';
import {InitDeleteAC, RemoveTodolistAC, RequestForRemoveTodoActionType} from '../actions/todos-actions';
import {watchAction} from './logActionsSaga';


function* deleteTodoListSaga(action: RequestForRemoveTodoActionType) {
    try {

        yield call(todoListAPI.deleteTodoList, action.payload.id)

        yield put(
            InitDeleteAC(true, action.payload.id)
        )

        yield delay(1000)

        yield put(
            RemoveTodolistAC(action.payload.id),
        )

    } catch (e: any) {

        yield put(
            InitDeleteAC(false, action.payload.id, e.message)
        )
        console.log(e);

    }

}

function* watchDeleteTodoListSaga() {
    yield takeEvery('REQUEST-REMOVE-TODOLIST', deleteTodoListSaga)
}

export function* rootSaga() {
    yield all([watchDeleteTodoListSaga(), watchAction()])
}