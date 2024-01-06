import {AppRootState} from "../../../hooks/useStore";
import {ThunkDispatch} from "redux-thunk";
import {ActionTasksTypes, AddTasktAC, ToggleTaskAC} from "../../actions/tasks-actions";
import {UpdateModelType, todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {delay, handleThunkActions} from "../../../utils/utils";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";
import {AppThunk} from "../../store";


export const toggleTasks = (todoListID: string, id: string, model: UpdateModelType): AppThunk => {
    return async (dispatch) => {
        try {

            handleThunkActions({
                'type': 'app',
                dispatch,
                successActionHandler: [() => SetAppStatusAC('loading')]
            })


            const task = await todolistTasksAPI.updateCompletedTasks(
                todoListID,
                id,
                model
            )

            handleThunkActions({
                type: 'app',
                dispatch,
                appErrorActionHandler: [
                    () => SetAppErrorAC(task.messages[0]),
                    () => SetAppStatusAC('failed'),
                ],
                resultCode: task.resultCode,
                successActionHandler: [
                    () => ToggleTaskAC(id, todoListID, task.status),
                    () => SetAppStatusAC('succeeded')
                ]

            })


        } catch (e: any) {
            console.log(e);

            handleThunkActions({
                type: 'network',
                dispatch,
                serverErrorActionHandler: [
                    () => dispatch(SetAppErrorAC(e.message)),
                    () => dispatch(SetAppStatusAC('failed'))
                ]
            })

        }
    }
}

