import { all, takeEvery } from 'redux-saga/effects';
function* logActions(action: any){
     console.table(action);
     yield 
}

export function* watchAction(){
     yield takeEvery('*', logActions)
}