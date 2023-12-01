import {AddTasktAC, RemoveAllTasksAC, RemoveTaskAC} from "../store/actions/tasks-actions";
import {useCallback} from "react";
import {useStore} from "./useStore";


export const useTodoList = () => {

    const {dispatch} = useStore()


    const OnDeleteTask = useCallback((id: string, todoListId: string) => {

        dispatch(RemoveTaskAC(id, todoListId))
    }, [dispatch]);



    const onDeleteAllTasks = (todoListId: string) => {

        dispatch(RemoveAllTasksAC(todoListId))
    };



    return {
        OnDeleteTask,
        onDeleteAllTasks,


    }

}