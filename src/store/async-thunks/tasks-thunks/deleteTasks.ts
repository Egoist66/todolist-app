import { AppRootState } from "../../../hooks/useStore";
import { ThunkDispatch } from "redux-thunk";
import { ActionTasksTypes, RemoveTaskAC } from "../../actions/tasks-actions";
import { todolistTasksAPI } from "../../../api/todolist-tasks-api";



export const deleteTasks = (todoListID:  string, id: string): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTasksTypes>) => {
        try {
            const tasks = await todolistTasksAPI.removeTasks(todoListID, id)
            
            dispatch(RemoveTaskAC( id, todoListID))


        }
        catch(e){
            console.log(e);

        }
    }
}

