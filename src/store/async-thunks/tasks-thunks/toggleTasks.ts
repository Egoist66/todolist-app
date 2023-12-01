import { AppRootState } from "../../../hooks/useStore";
import { ThunkDispatch } from "redux-thunk";
import { ActionTasksTypes, ToggleTaskAC } from "../../actions/tasks-actions";
import { UpdateModelType, todolistTasksAPI } from "../../../api/todolist-tasks-api";




export const toggleTasks = (todoListID: string, id: string, model: UpdateModelType): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTasksTypes>) => {
        try {
            const task = await todolistTasksAPI.updateCompletedTasks(
                todoListID, 
                id, 
                model
            )
            

            dispatch(ToggleTaskAC(
                id, 
                todoListID, 
                task.status
            ))

        }
        catch(e){
            console.log(e);

        }
    }
}

