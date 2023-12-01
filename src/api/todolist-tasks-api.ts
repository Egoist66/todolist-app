import { instance } from "./todo-lists-api";
import { Dispatch } from "redux";
import { EditTaskAC, RemoveAllTasksAC, RemoveAllTasksActionType, ToggleTaskAC } from "../store/actions/tasks-actions";
import { AppDispatch } from "../hooks/useStore";

export type ResponseRootTask<T> = {
    error: string | null
    items: T
    totalCount: number
}

export type ResponseTaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}



export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgent = 3,
    Later = 4
}


type UpdateModelType = {
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    description: string,
    deadline: string

}

export const todolistTasksAPI = {

    async getTasks(todolistID: string) {
        const { data } = await instance.get<ResponseRootTask<ResponseTaskType[]>>(`todo-lists/${todolistID}/tasks`)

        return data
       
    },

    async createTasks(todolistID: string, title: string) {
        const { data: { data } } = await instance.post(
            `todo-lists/${todolistID}/tasks`,
            { title },
        )
        
        return data.item


    },


    async removeTasks(todolistID: string, id: string) {
        const { data } = await instance.delete(
            `todo-lists/${todolistID}/tasks/${id}`,
        )

        return data

    },
    async removeAllTasks(dispatch: Dispatch<RemoveAllTasksActionType>, todolistID: string) {
        const { data } = await instance.delete(
            `todo-lists/${todolistID}/tasks/`,
        )


        dispatch(RemoveAllTasksAC(todolistID))

    },

    async updateTasks(dispatch: AppDispatch, todolistID: string, id: string, title: string) {
        const { data: { data } } = await instance.put(
            `todo-lists/${todolistID}/tasks/${id}`,
            { title },
        )

        dispatch(EditTaskAC(data.item.title, data.item.id, data.item.todoListId))

    },
    async updateCompletedTasks(dispatch: AppDispatch, todolistID: string, id: string, model: UpdateModelType) {
        const { data } = await instance.put(
            `todo-lists/${todolistID}/tasks/${id}`,
            model,
        )

        console.log(data)


        dispatch(ToggleTaskAC(
            id, 
            todolistID, 
            data.data.item.status
        ))


    }


}

