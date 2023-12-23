import {AddTasktAC, SetTasksEntityStatus} from "../../actions/tasks-actions";
import {todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";
import {AppThunk} from "../../store";
import {Dispatch} from "redux";
import {delay, handleThunkActions, LS} from "../../../utils/utils";


type CreateTasksThunkProps = {
    title: string
    todoListID: string
}

export const createTasks = ({title, todoListID}: CreateTasksThunkProps): AppThunk => {
    const {save} = LS()

    return async (dispatch: Dispatch) => {
        try {

            handleThunkActions({
                'type': 'app',
                dispatch,
                successActionHandler: [() => SetAppStatusAC('loading')]
            })

            const task = await todolistTasksAPI.createTasks(todoListID, title)

            handleThunkActions({
                type: 'app',
                dispatch,
                appErrorActionHandler: [
                    () => SetAppErrorAC(task.messages[0]),
                    () => SetAppStatusAC('failed'),
                ],
                sideEffect: [() => {
                    save('app-status', task.messages[0] ? 'failed': 'succeeded', true)
                    delay(500).then(() => {
                        save('app-status', task.messages[0] ? 'failed': 'idle', true)
                    })
                }],
                resultCode: task.resultCode,
                successActionHandler: [
                    () => AddTasktAC(task.data.item),
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

