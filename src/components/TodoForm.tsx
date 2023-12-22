import {ChangeEvent, FC, memo, useCallback, useState} from "react"
import {TodoFormPropsType} from "../types/Types"
import {Button, TextField,} from "@material-ui/core";
import {View} from "../service-components/View/View";
import {useStore} from "../hooks/useStore";

type FormStateType = {
    title: string,
    error: boolean
    success: boolean | null
}

export const TodoForm: FC<TodoFormPropsType> = memo(({
 onTodoFormHandler,
 restrictedQuantity,
 isDeletedTodo,
 placeholder,
 todoListId,
 formName
 }) => {

    const [state, setState] = useState<FormStateType>({
        title: '',
        error: false,
        success: null
    })
    const {error, title} = state
    const {dispatch} = useStore()

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
                error: true,
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

    const disabledReason = restrictedQuantity ? restrictedQuantity[0].data.length >= restrictedQuantity[0].quantity  : false

    return (

        <View className="todo-form">

            <TextField
                error={error}
                onKeyDown={(e) => {
                    e.key === 'Enter' && addTask()
                }}
                value={title}
                // disabled={title.length >= 100}
                onChange={onSetTitle}
                id="standard-basic"
                label={placeholder}
            />


            <Button
                size={"small"}
                disabled={disabledReason || isDeletedTodo}
                color={error || title.length > 100 ? 'secondary' : 'primary'}
                variant={"contained"}
                onClick={addTask}>

                {formName}
            </Button>


        </View>
    )

})


