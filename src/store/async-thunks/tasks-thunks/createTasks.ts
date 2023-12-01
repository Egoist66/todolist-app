import { AppRootState } from "../../../hooks/useStore";
import { ThunkDispatch } from "redux-thunk";
import { ActionTasksTypes, AddTasktAC } from "../../actions/tasks-actions";
import { todolistTasksAPI } from "../../../api/todolist-tasks-api";


type CreateTasksThunkProps = {
    title: string
    todoListID: string
}

export const createTasks = ({title, todoListID}: CreateTasksThunkProps): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTasksTypes>) => {
        try {
            const task = await todolistTasksAPI.createTasks(todoListID, title)
            

            dispatch(AddTasktAC(task))

        }
        catch(e){
            console.log(e);

        }
    }
}

