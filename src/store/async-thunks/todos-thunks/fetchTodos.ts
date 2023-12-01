import { ActionTodosTypes, FetchTodosAC } from "../../actions/todos-actions";
import { todoListAPI } from '../../../api/todo-lists-api';
import { AppRootState } from "../../../hooks/useStore";
import { ThunkDispatch } from "redux-thunk";
import { SetLoadingtAC, ErrorResetAC, CatchErrorAC, CatchUIActions } from "../../actions/ui-actions";



export const fetchTodos = (): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTodosTypes | CatchUIActions>) => {
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

