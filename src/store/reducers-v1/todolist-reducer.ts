import {Todos} from "../../types/Types";
import {ActionTodosTypes} from "../actions/todos-actions";

export const todoList1 = crypto.randomUUID();
export const todoList2 = crypto.randomUUID();

const initialState: Todos =  {
    todos: []
}
export const todolistReducer = (state: Todos = initialState, action: ActionTodosTypes): Todos => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload.id)
            }

        }

        case 'INIT-DELETE': {
            return {
                ...state,
                todos: state.todos.map(t => t.id === action.payload.id ? {...t, isDeleted: action.payload.isDeleted, info: action.payload.info}: t)
            }
        }

      
        case 'FETCH-TODOS': {
            return {
                ...state,
                todos: action.payload.todos.map(t => ({
                    id: t.id,
                    title: t.title,
                    isDeleted: false
                
                }))
            }
        }


        case 'SET-TODO': {
            return {
                ...state,
                todos: [...state.todos, {
                    id: action.payload.id,
                    title: action.payload.title,
                    isDeleted: false
                }]


            }


        }
        case 'CHANGE-TODOLIST-TITLE': {
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ?
                    {...todo, title: action.payload.title} : todo
                )
            }

        }
        default:
            return state
    }
}