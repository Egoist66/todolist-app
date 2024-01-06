import {FetchTodosAC} from "../../actions/todos-actions";
import {todoListAPI} from '../../../api/todo-lists-api';
import {AppThunk} from "../../store";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";
import {handleThunkActions} from "../../../utils/utils";


export const fetchTodos = (): AppThunk => {
    return async (dispatch) => {
        try {

            handleThunkActions({
                'type': 'app',
                dispatch,
                successActionHandler: [() => SetAppStatusAC('loading')]
            })


            const todos = await todoListAPI.getTodoLists()

            handleThunkActions({
                type: 'app',
                dispatch,
                successActionHandler: [
                    () => FetchTodosAC(todos),
                    () => SetAppStatusAC('succeeded')
                ]

            })


        } catch (e: any) {
            console.log(e);

            handleThunkActions({
                'type': 'network',
                dispatch,
                serverErrorActionHandler: [() => SetAppStatusAC('failed'), () => SetAppErrorAC(e.message)]
            })


        }

    }
}

