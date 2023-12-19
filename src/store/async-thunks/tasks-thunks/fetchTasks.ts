import {AppRootState} from "../../../hooks/useStore";
import {ThunkDispatch} from "redux-thunk";
import {ActionTasksTypes, FetchTasksAC} from "../../actions/tasks-actions";
import {todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {CatchErrorAC} from "../../actions/ui-actions";


export const fetchTasks = (todoListID:  string): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTasksTypes>) => {
        try {
            const tasks = await todolistTasksAPI.getTasks(todoListID)
            
            dispatch(FetchTasksAC(
                tasks.items, 
                todoListID
            ))

        }
        catch(e){
            console.log(e);
            dispatch(CatchErrorAC())

        }

    }
}

