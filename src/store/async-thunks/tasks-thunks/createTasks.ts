import {AddTasktAC} from "../../actions/tasks-actions";
import {todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {SetAppErrorAC} from "../../actions/app-actions";
import {AppThunk} from "../../store";
import {Dispatch} from "redux";


type CreateTasksThunkProps = {
    title: string
    todoListID: string
}

export const createTasks = ({title, todoListID}: CreateTasksThunkProps): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const task = await todolistTasksAPI.createTasks(todoListID, title)
            if(task.resultCode === 1){
                dispatch(SetAppErrorAC(task.messages[0]))
                return

            }
            dispatch(AddTasktAC(task.data.item))

        }
        catch(e: any){
            console.log(e);
            dispatch(SetAppErrorAC(e.message))

        }
    }
}

