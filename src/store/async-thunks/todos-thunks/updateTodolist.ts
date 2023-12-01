import { ThunkDispatch } from "redux-thunk";
import { todoListAPI } from "../../../api/todo-lists-api";
import { AppRootState } from "../../../hooks/useStore";
import { ActionTodosTypes, ChangeTodolistTitleAC } from "../../actions/todos-actions";


export const updateTodoList = (id: string, title: string): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTodosTypes>) => {
        try {
            const todo = await todoListAPI.updateTodoList(id, title)

            dispatch(ChangeTodolistTitleAC(title, id))

        }
        catch (e) {
            console.log(e);

        }
    }
}
