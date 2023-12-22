import {todoListAPI} from "../../../api/todo-lists-api";
import {SetTodolistAC} from "../../actions/todos-actions";
import {AppThunk} from "../../store";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";


export const createTodoList = (title: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(SetAppStatusAC('loading'))

            const todo = await todoListAPI.createTodoList(title)

            if(todo.resultCode === 1){
                dispatch(SetAppErrorAC(todo.messages[0]))
                return

            }
            dispatch(SetTodolistAC(todo?.data.item.title, todo?.data.item.id))
            dispatch(SetAppStatusAC('succeeded'))




        }
        catch (e: any) {

            console.error(e);
            dispatch(SetAppStatusAC('failed'))
            dispatch(SetAppErrorAC(e.message))



        }

       
     }
}
