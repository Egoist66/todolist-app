import {todoListAPI} from "../../../api/todo-lists-api";
import {SetTodolistAC} from "../../actions/todos-actions";
import {AppThunk} from "../../store";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";
import { handleThunkActions } from "../../../utils/utils";


export const createTodoList = (title: string): AppThunk => {
    return async (dispatch) => {
        try {
            handleThunkActions({
                'type': 'app',
                dispatch,
                successActionHandler: [() => SetAppStatusAC('loading')]
            })

            const todo = await todoListAPI.createTodoList(title)

            handleThunkActions({
                type: 'app',
                appErrorActionHandler: [() => SetAppErrorAC(todo.messages[0]), () => SetAppStatusAC('failed')],
                dispatch,
                resultCode: todo.resultCode,
                successActionHandler: [() => SetTodolistAC(todo?.data.item.title, todo?.data.item.id), () => SetAppStatusAC('succeeded')]
            })

    
        }
        catch (e: any) {

            console.error(e);

            handleThunkActions({
                type: 'network',
                dispatch,
                serverErrorActionHandler: [() => SetAppErrorAC(e.message), () => SetAppStatusAC('failed')]
            })
           



        }

       
     }
}
