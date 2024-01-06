import {AppRootState} from "../../../hooks/useStore";
import {ThunkDispatch} from "redux-thunk";
import {ActionTasksTypes, FetchTasksAC} from "../../actions/tasks-actions";
import {todolistTasksAPI} from "../../../api/todolist-tasks-api";
import {CatchErrorAC} from "../../actions/ui-actions";
import {AppThunk} from "../../store";


export const fetchTasks = (todoListID:  string): AppThunk => {
    return async (dispatch) => {
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

