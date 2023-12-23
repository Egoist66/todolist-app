import { Todos } from "../../types/Types";
import {SetTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "../actions/todos-actions";
import {v1} from 'uuid'
import {todolistReducer} from "./todolist-reducer";


test('todolist reducer should remove correct todolist', () => {
    const todoList1 = v1();
    const todoList2 = v1();

    const initialState: Todos = {
        todos: [
            // TodoLists general Interface
            {id: todoList1, title: "First Todo", isDeleted: false},
            {id: todoList2, title: "Second Todo", isDeleted: false},
        ]
    }

    const endState = todolistReducer(initialState, RemoveTodolistAC(todoList1))

    expect(endState.todos.length).toEqual(1)
    expect(endState.todos[0].id).toBe(todoList2)
})

test('todolist reducer should add new todolist', () => {
    const todoList1 = v1();
    const todoList2 = v1();

    const initialState: Todos = {
        todos: [
            // TodoLists general Interface
            {id: todoList1, title: "First Todo", isDeleted: false},
            {id: todoList2, title: "Second Todo", isDeleted: false},
        ]
    }

    let newTitle = 'Hello'

    const endState = todolistReducer(initialState, SetTodolistAC(newTitle, Math.random().toString()))

    expect(endState.todos.length).toEqual(3)
    expect(endState.todos[0].title).toBe(newTitle)
})

test('todolist reducer should change todolist title', () => {
    const todoList1 = v1();
    const todoList2 = v1();

    const initialState: Todos = {
        todos: [
            // TodoLists general Interface
            {id: todoList1, title: "First Todo", isDeleted: false},
            {id: todoList2, title: "Second Todo", isDeleted: false},
        ]
    }

    let newTitle = 'Third Todo'
    const endState = todolistReducer(initialState, ChangeTodolistTitleAC(newTitle, todoList2))

    expect(endState.todos[0].title).toBe('First Todo')
    expect(endState.todos[1].title).toBe(newTitle)
})

