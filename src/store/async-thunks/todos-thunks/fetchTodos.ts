import {ActionTodosTypes, FetchTodosAC} from "../../actions/todos-actions";
import {todoListAPI} from '../../../api/todo-lists-api';
import {CatchErrorAC, ErrorResetAC, SetLoadingtAC} from "../../actions/ui-actions";
import {Dispatch} from "redux";
import {AppThunk} from "../../store";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";


export const fetchTodos = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(SetAppStatusAC('loading'))

            const todos = await todoListAPI.getTodoLists()
            
            dispatch(FetchTodosAC(todos))
            dispatch(SetAppStatusAC('succeeded'))


        }
        catch(e: any){
            console.log(e);
            dispatch(SetAppStatusAC('failed'))
            dispatch(SetAppErrorAC(e.message))



        }

    }
}

