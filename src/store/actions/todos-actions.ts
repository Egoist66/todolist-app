import {TodoListAPIType} from "../../api/todo-lists-api"
import {CatchUIActions} from "./ui-actions";
import {Statuses} from "../reducers/app-reducer";

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



export type FetchTodosActionType = {
    type: 'FETCH-TODOS',
    payload: {
        todos: Array<TodoListAPIType>
    }
}



export type ActionTodosTypes =
     ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof SetTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof FetchTodosAC>
    | ReturnType<typeof RequestRemoveTodolistAC>
    | ReturnType<typeof SetTodoEntityStatus>
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

export const InitDeleteAC = (isDeleted: boolean, id: string, info?: string) => {
    return {type: 'INIT-DELETE', payload: {isDeleted, id, info}} as const
}

export const SetTodoEntityStatus = (id: string, status: Statuses) => {
    return {type: 'SET-TODO-ENTITY-STATUS', payload: {id, status}} as const
}



