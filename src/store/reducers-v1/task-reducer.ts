import { TasksElems } from "../../types/Types";
import { ActionTasksTypes } from "../actions/tasks-actions";


const initialState: TasksElems = {}

export const tasksReducer = (state: TasksElems = initialState, action: ActionTasksTypes): TasksElems => {
    switch (action.type) {

        case 'FETCH-TASKS': {
            const tasksCopy = { ...state }

            tasksCopy[action.payload.todoListID] = action.payload.tasks


            return tasksCopy
        }

        case 'ADD-TASK': {

            const { todoListId } = action.payload.task
            const { task } = action.payload
            
            return {
                ...state,
                [todoListId]: [task, ...state[todoListId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.id)
            }

        }
        case 'EDIT-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.id ? { ...t, title: action.payload.title, status: action.payload.status} : t)
            }

        }
        case 'TOGGLE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.id ? { ...t, status: action.payload.status } : t)
            }


        }
        case 'REMOVE-ALL-TASKS': {
            return {
                ...state,
                [action.payload.todoListID]: []

            }

        }
        case 'FETCH-TODOS': {

            const copyState = { ...state }
            action.payload.todos.forEach(t => {
                copyState[t.id] = []
            })

            return copyState

        }


        case 'SET-TODO': {
            return {
                ...state,
                [action.payload.id]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state }
            delete stateCopy[action.payload.id]

            return stateCopy
        }
        default:
            return state
    }
}