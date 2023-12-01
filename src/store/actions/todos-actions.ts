import { TodoListAPIType } from "../../api/todo-lists-api"

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
        todos:  Array<TodoListAPIType>
    }
}

export type InitDeleteActionType = {
    type: 'INIT-DELETE',
    payload: {
        isDeleted:  boolean
        id: string
    }
}



export type ActionTodosTypes =
    RemoveTodoActionType
    | SetTodoListActionType
    | ChangeTodoListTitleActionType
    | FetchTodosActionType
    | RequestForRemoveTodoActionType
    | InitDeleteActionType







export const RemoveTodolistAC = (id: string): RemoveTodoActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id } }
}

export const RequestRemoveTodolistAC = (id: string): RequestForRemoveTodoActionType => {
    return { type: 'REQUEST-REMOVE-TODOLIST', payload: { id } }
}

export const SetTodolistAC = (title: string, id: string): SetTodoListActionType => {
    return { type: 'SET-TODO', payload: { title, id } }
}


export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } }
}

export const FetchTodosAC = (todos: TodoListAPIType[]): FetchTodosActionType => {
    return { type: 'FETCH-TODOS', payload: {todos}}
}

export const InitDeleteAC = (isDeleted: boolean, id: string): InitDeleteActionType => {
    return { type: 'INIT-DELETE', payload: {isDeleted, id}}
}


