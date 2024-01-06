import { todoListAPI } from "../../../api/todo-lists-api";
import { ChangeTodolistTitleAC } from "../../actions/todos-actions";
import { SetAppErrorAC, SetAppStatusAC } from "../../actions/app-actions";
import { AppThunk } from "../../store";
import { handleThunkActions } from "../../../utils/utils";


export const updateTodoList = (id: string, title: string): AppThunk => {
    return async (dispatch) => {
        try {

            handleThunkActions({
                'type': 'app',
                dispatch,
                successActionHandler: [() => SetAppStatusAC('loading')]
            })


            const data = await todoListAPI.updateTodoList(id, title)

            handleThunkActions({
                type: 'app',
                appErrorActionHandler: [() => SetAppErrorAC(data.messages[0]), () => SetAppStatusAC('failed')],
                dispatch: dispatch,
                resultCode: data.resultCode,
                successActionHandler: [
                    () => ChangeTodolistTitleAC(title, id), 
                    () => SetAppStatusAC('succeeded')
                ]
            })
            

        }
        catch (e: any) {

            handleThunkActions({
                type: 'network',
                dispatch: dispatch,
                serverErrorActionHandler: [() => SetAppErrorAC(e.message), () => SetAppStatusAC('failed')]
            })
          
        }
    }
}
