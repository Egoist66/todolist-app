import {ActionTodosTypes, FetchTodosAC} from "../../actions/todos-actions";
import {todoListAPI} from '../../../api/todo-lists-api';
import {CatchErrorAC, ErrorResetAC, SetLoadingtAC} from "../../actions/ui-actions";
import {Dispatch} from "redux";
import {AppThunk} from "../../store";


export const fetchTodos = (): AppThunk=> {
    return async (dispatch: Dispatch<ActionTodosTypes>) => {
        try {
            dispatch(SetLoadingtAC(true))
            dispatch(ErrorResetAC())
            const todos = await todoListAPI.getTodoLists()
            
            dispatch(FetchTodosAC(todos))

        }
        catch(e){
            console.log(e);
            dispatch(CatchErrorAC())


        }
        finally {
            dispatch(SetLoadingtAC(false))

        }
    }
}

