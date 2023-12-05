import { ThunkDispatch } from "redux-thunk";
import { todoListAPI } from "../../../api/todo-lists-api";
import { AppRootState } from "../../../hooks/useStore";
import { ActionTodosTypes, ChangeTodolistTitleAC, RemoveTodolistAC } from "../../actions/todos-actions";
import { CatchUIActions, SetDeletetAC } from "../../actions/ui-actions";


export const deleteTodoList = (id: string): any => {
    return async (dispatch: ThunkDispatch<AppRootState, undefined, ActionTodosTypes>) => {

        try {
            const todo = await todoListAPI.deleteTodoList(id)

            dispatch(SetDeletetAC(true))
            dispatch(RemoveTodolistAC(id))


        }
        catch (e) {
            console.log(e);


        }
        finally {
            dispatch(SetDeletetAC(false))

        }
    }
}
