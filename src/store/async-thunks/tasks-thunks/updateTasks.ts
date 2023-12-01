import { AppRootState } from "../../../hooks/useStore";
import { ThunkDispatch } from "redux-thunk";
import { ActionTasksTypes, EditTaskAC } from "../../actions/tasks-actions";
import { TaskStatuses, todolistTasksAPI } from "../../../api/todolist-tasks-api";




export const updateTasks = (todoListID: string, id: string, title: string, status: TaskStatuses): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTasksTypes>) => {
        try {
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


        }
        catch (e) {
            console.log(e);

        }
    }
}

