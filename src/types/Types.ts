import {ActionTasksTypes} from "../store/actions/tasks-actions";
import {ActionTodosTypes} from "../store/actions/todos-actions";
import {TaskStatuses} from "../api/todolist-tasks-api";

export type TasksProps = {
    status: TaskStatuses;
    id: string;
    title: string;

};


export type TaskTypeProps = {
    data: {
        id: string,
        title: string
        status: TaskStatuses
        todoListId: string
    }


}

export type TasksElems = {
    [key: string]: TaskType[]
}

export type TodoListProps = {
    id: string,
    title: string,
    isDeleted: boolean

}

export type Todos = {
    todos: TodoListProps[]

}


export type TaskType = {
    id: string;
    title: string;
    todoListId: string
    status: TaskStatuses;
}
  
export type FilterProps = "All" | "Active" | "Completed"
  
export type PropsType = {
    title: string;
    todoListID: string;
    isDeleted: boolean;
    tasksForFilter?: TasksElems
    todos?: TodoListProps[]
    setTodo?: (action: ActionTodosTypes) => void
    setTasks?: (action: ActionTasksTypes) => void

};

export type TodoFormPropsType = {
    onTodoFormHandler: (title: string, todoListId: string) => void,
    todoListId?: string,
    formName:string
    placeholder: string

}

export type ButtonFilterProps = {
    text: string,
    callback: () => void,
    _disabled?: boolean
}

export type ButtonProps = {
    text: string,
    callback: () => void,
    _disabled?: boolean
}

export type TButton =  ButtonProps | ButtonFilterProps

export type PreloadedStateType  = {
    todos: TodoListProps[],
    tasks: TasksElems
}