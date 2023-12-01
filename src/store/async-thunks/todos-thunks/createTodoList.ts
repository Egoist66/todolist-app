import { ThunkDispatch } from "redux-thunk";
import { todoListAPI } from "../../../api/todo-lists-api";
import { AppRootState } from "../../../hooks/useStore";
import { ActionTasksTypes } from "../../actions/tasks-actions";
import { SetTodolistAC } from "../../actions/todos-actions";
import { CatchErrorAC, CatchUIActions, ErrorResetAC, SetLoadingtAC } from "../../actions/ui-actions";


export const createTodoList = (title: string): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTasksTypes | CatchUIActions>) => {
        try {
            dispatch(SetLoadingtAC(true))
            dispatch(ErrorResetAC())

            const todo = await todoListAPI.createTodoList(title)

            dispatch(SetTodolistAC(todo.title, todo.id))

        }
        catch (e) {

            console.log(e);
            dispatch(CatchErrorAC())


        }
        finally {
            dispatch(SetLoadingtAC(false))
        }
       
     }
}
