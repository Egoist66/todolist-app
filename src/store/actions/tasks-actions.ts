import {ResponseTaskType, TaskStatuses} from "../../api/todolist-tasks-api";
import {CatchUIActions} from "./ui-actions";
import {FetchTodosActionType, RemoveTodoActionType, SetTodoListActionType} from "./todos-actions";


type Task = {title: string, id: string, status: TaskStatuses, todoListId: string}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        task: Task,
    }
}


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
        todoListID: string
    }
}

type EditTaskActionType = {
    type: 'EDIT-TASK'
    payload: {
        id: string
        todoListID: string
        title: string
        status: TaskStatuses
    }
}

type ToggleTaskActionType = {
    type: 'TOGGLE-TASK'
    payload: {
        id: string
        todoListID: string,
        status: TaskStatuses
    }
}

export type RemoveAllTasksActionType = {
    type: 'REMOVE-ALL-TASKS'
    payload: {
        todoListID: string
    }
}

export type FetchTasksActionType = {
    type: 'FETCH-TASKS'
    payload: {
        tasks: Array<ResponseTaskType>
        todoListID: string
    }
}



export type ActionTasksTypes = AddTaskActionType
    | RemoveTaskActionType
    | RemoveAllTasksActionType
    | ToggleTaskActionType
    | EditTaskActionType
    | SetTodoListActionType
    | RemoveTodoActionType
    | FetchTodosActionType
    | FetchTasksActionType
    | CatchUIActions

export const RemoveTaskAC = (id: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK',payload: {id, todoListID}}
}

export const AddTasktAC = (task: Task): AddTaskActionType => {
    return {type: 'ADD-TASK',payload: {task}}
}

export const EditTaskAC = (title: string, status: TaskStatuses, id: string, todoListID: string): EditTaskActionType => {
    return {type: 'EDIT-TASK',payload: {title, status, id, todoListID}}
}
export const ToggleTaskAC = (id: string, todoListID: string, status: TaskStatuses): ToggleTaskActionType => {
    return {type: 'TOGGLE-TASK',payload: {id, todoListID, status}}
}
export const RemoveAllTasksAC = (todoListID: string): RemoveAllTasksActionType => {
    return {type: 'REMOVE-ALL-TASKS',payload: {todoListID}}
}

export const FetchTasksAC = (tasks: Array<ResponseTaskType>, todoListID: string): FetchTasksActionType => {
    return {type: 'FETCH-TASKS', payload: {tasks, todoListID}}
}

