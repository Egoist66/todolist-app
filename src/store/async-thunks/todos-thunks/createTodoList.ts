import {todoListAPI} from "../../../api/todo-lists-api";
import {SetTodolistAC} from "../../actions/todos-actions";
import {CatchErrorAC, ErrorResetAC, SetLoadingtAC} from "../../actions/ui-actions";
import {AppThunk} from "../../store";


export const createTodoList = (title: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(SetLoadingtAC(true))
            dispatch(ErrorResetAC())

            const todo = await todoListAPI.createTodoList(title)
            dispatch(SetTodolistAC(todo.title, todo.id))



        }
        catch (e) {

            console.error(e);
            dispatch(CatchErrorAC())


        }
        finally {
            dispatch(SetLoadingtAC(false))
        }
       
     }
}
