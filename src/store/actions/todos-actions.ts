import {TodoListAPIType} from "../../api/todo-lists-api"
import {CatchUIActions} from "./ui-actions";

export type RemoveTodoActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}


export type RequestForRemoveTodoActionType = {
    type: 'REQUEST-REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type SetTodoListActionType = {
    type: 'SET-TODO'
    payload: {
        title: string
        id: string
    }
}


export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type FetchTodosActionType = {
    type: 'FETCH-TODOS',
    payload: {
        todos: Array<TodoListAPIType>
    }
}

export type InitDeleteActionType = {
    type: 'INIT-DELETE',
    payload: {
        isDeleted: boolean
        id: string
    }
}


export type ActionTodosTypes =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof SetTodolistAC>

    | ReturnType<typeof ChangeTodolistTitleAC>

    | ReturnType<typeof FetchTodosAC>

    | ReturnType<typeof RequestRemoveTodolistAC>

    | ReturnType<typeof InitDeleteAC>

    | CatchUIActions


export const RemoveTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}

export const RequestRemoveTodolistAC = (id: string) => {
    return {type: 'REQUEST-REMOVE-TODOLIST', payload: {id}} as const
}

export const SetTodolistAC = (title: string, id: string) => {
    return {type: 'SET-TODO', payload: {title, id}} as const
}


export const ChangeTodolistTitleAC = (title: string, id: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}

export const FetchTodosAC = (todos: TodoListAPIType[]) => {
    return {type: 'FETCH-TODOS', payload: {todos}} as const
}

export const InitDeleteAC = (isDeleted: boolean, id: string) => {
    return {type: 'INIT-DELETE', payload: {isDeleted, id}} as const
}


