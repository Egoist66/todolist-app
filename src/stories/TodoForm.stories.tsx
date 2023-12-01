import {TodoForm} from "../components/TodoForm";
import {FC} from "react";
import {action} from '@storybook/addon-actions'


export default  {
    title: 'TodoList/TodoForm',
    component: TodoForm,
    tags: ['autodocs'],
}

type TodoFormStory  = {
    placeHolder: string
    formName: string
}

const callback = action(`TodoForm was submitted with value`)
export const TodoFormStory: FC<TodoFormStory> = ({placeHolder = 'Add new Name', formName = 'Create Todolist'}) => {
    return <>

        <TodoForm
            formName={formName}
            onTodoFormHandler={callback}
            todoListId={'2'}
            placeholder={placeHolder}
        />

    </>
}