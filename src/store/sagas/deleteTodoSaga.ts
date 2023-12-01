import { put, takeEvery, delay, call, all } from 'redux-saga/effects'
import { todoListAPI } from '../../api/todo-lists-api';
import { InitDeleteAC, RemoveTodolistAC, RequestForRemoveTodoActionType } from '../actions/todos-actions';
import { watchAction } from './logActionsSaga';


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
         
     }
     catch (e) {
          console.log(e);

     }
   
}

function* watchDeleteTodoListSaga() {
     yield takeEvery('REQUEST-REMOVE-TODOLIST', deleteTodoListSaga)
}

export function* rootSaga() {
     yield all([watchDeleteTodoListSaga(), watchAction()])
}