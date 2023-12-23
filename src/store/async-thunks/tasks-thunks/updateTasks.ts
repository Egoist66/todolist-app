import { EditTaskAC, SetTasksEntityStatus } from "../../actions/tasks-actions";
import {TaskStatuses, todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {AppThunk} from "../../store";


export const updateTasks = (todoListID: string, id: string, title: string, status: TaskStatuses): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(SetTasksEntityStatus(todoListID, id, 'loading'))

            const task = await todolistTasksAPI.updateTasks(
                todoListID,
                id,
                title,
                status
            )

            dispatch(EditTaskAC(
                task.title,
                status,
                task.id,
                task.todoListId
            ))

            dispatch(SetTasksEntityStatus(todoListID, id, 'succeeded'))


        } catch (e) {
            console.log(e);

            dispatch(SetTasksEntityStatus(todoListID, id, 'failed'))
            const timer = setTimeout(() =>{
                dispatch(SetTasksEntityStatus(todoListID, id, 'idle'))
                clearTimeout(timer)
            }, 2000)


        }
    }
}

