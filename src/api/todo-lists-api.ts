import axios from "axios";
import {TodoListProps} from "../types/Types";


export type TodoListAPIType = TodoListProps & {
    addedDate: string
    order: number
}

export type DeleteUpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}



export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "3770031c-9c32-4355-8e63-2d5e290922cb",

    }
})


export const todoListAPI = {

    async getTodoLists() {
        const { data, status } = await instance.get<TodoListAPIType[]>('todo-lists')

        return data

    },

    async createTodoList(title: string) {
        const { data, status } = await instance.post('todo-lists', { title })

        const { data: { item } } = data
        const todo: TodoListAPIType = item


        return data
    },


    async updateTodoList(id: string, title: string) {
        const { data } = await instance.put<DeleteUpdateTodolistResponseType>(`todo-lists/${id}`, { title })

        return data
    },

    async deleteTodoList(id: string) {
        const { data } = await instance.delete<DeleteUpdateTodolistResponseType>(`todo-lists/${id}`)


    },



}


