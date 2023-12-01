import {v1} from 'uuid'
import {TasksElems} from "../../types/Types";
import {AddTasktAC, EditTaskAC, RemoveAllTasksAC, RemoveTaskAC,ToggleTaskAC} from "../actions/tasks-actions";
import {tasksReducer} from "./task-reducer";
import {TaskStatuses} from "../../api/todolist-tasks-api";

let initialState: TasksElems
const todoList1 = v1();
const todoList2 = v1();

beforeEach(() =>{
    initialState = {
        [todoList1]: [
            {
                id: '1',
                title: "HTML&CSS",
                status: 1,
                todoListId: todoList1
            },

        ],

        [todoList2]: [
            {
                id: '1',
                title: "PHP",
                status: 1,
                todoListId:todoList2
            },


        ],
    }
})



test('should remove a task', () => {

    const endState = tasksReducer(
        initialState,
        RemoveTaskAC('1', todoList2)
    )
    console.log(endState)
    expect(endState[todoList2].length).toEqual(0)
})

test('should edit task', () => {
    expect(initialState[todoList1][0].title).toBe('HTML&CSS')
    const newTitle = 'Assembler'

    const endState = tasksReducer(
        initialState,
        EditTaskAC(newTitle, '1', todoList1)
    )
    console.log(endState)

    expect(endState[todoList1][0].title).toBe(newTitle)
})

test('should remove all tasks', () => {


    const endState = tasksReducer(
        initialState,
        RemoveAllTasksAC(todoList2)
    )


    expect(endState[todoList2].length).toBe(0)
    console.log(endState)
})
test('should toggle complete task', () => {


    const endState = tasksReducer(
        initialState,
        ToggleTaskAC('1', todoList1, TaskStatuses.Completed)
    )


    expect(endState[todoList1][0].status).toBe(1)
    expect(endState[todoList2][0].status).toBe(2)
    console.log(endState)
})