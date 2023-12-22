import {AddTasktAC, SetTasksEntityStatus} from "../../actions/tasks-actions";
import {todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";
import {AppThunk} from "../../store";
import {Dispatch} from "redux";


type CreateTasksThunkProps = {
    title: string
    todoListID: string
}

export const createTasks = ({title, todoListID}: CreateTasksThunkProps): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(SetAppStatusAC('loading'))
            const task = await todolistTasksAPI.createTasks(todoListID, title)
            if(task.resultCode === 1){
                dispatch(SetAppErrorAC(task.messages[0]))
                dispatch(SetAppStatusAC('failed'))

                return

            }
            dispatch(AddTasktAC(task.data.item))
            dispatch(SetAppStatusAC('succeeded'))


        }
        catch(e: any){
            console.log(e);
            dispatch(SetAppErrorAC(e.message))
            dispatch(SetAppStatusAC('failed'))



        }
    }
}

