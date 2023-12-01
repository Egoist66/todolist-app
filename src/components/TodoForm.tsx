import {ChangeEvent, FC, memo, useCallback, useState} from "react"
import {TodoFormPropsType} from "../types/Types"
import {Button, TextField} from "@material-ui/core";
import {View} from "../service-components/View/View";

type FormStateType = {
    title: string,
    error: boolean
}

export const TodoForm: FC<TodoFormPropsType> = memo(({onTodoFormHandler, placeholder, todoListId, formName}) => {

    const [state, setState] = useState<FormStateType>({
        title: '',
        error: false
    })

    const {error, title} = state

    const onSetTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            error: false,
            title: e.currentTarget.value
        })
    }, [title, error])

    const addTask = useCallback(() => {

        if (title.trim() === '') {

            setState({
                ...state,
                error: true
            })

            return
        }

        onTodoFormHandler(title, todoListId ? todoListId : "")

        setState({
            ...state,
            error: false,
            title: ''
        })
    }, [title, error])


    return (

        <View className="todo-form">


            <TextField
                error={error}
                onKeyDown={(e) => {
                    e.key === 'Enter' && addTask()
                }}
                value={title}
                onChange={onSetTitle}
                id="standard-basic"
                label={placeholder}
            />


            <Button
                size={"small"}
                color={error ? 'secondary' : 'primary'}
                variant={"contained"}
                onClick={addTask}>
                {error ? 'The field is required!' : formName}
            </Button>


        </View>
    )

})


