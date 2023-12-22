import {ChangeEvent, FC, memo, useCallback, useEffect, useState} from "react"
import {TodoFormPropsType} from "../types/Types"
import {Button, TextField,} from "@material-ui/core";
import {View} from "../service-components/View/View";
import {useStore} from "../hooks/useStore";
import {SetAppErrorAC} from "../store/actions/app-actions";

type FormStateType = {
    title: string,
    error: boolean
    success: boolean | null
}

export const TodoForm: FC<TodoFormPropsType> = memo(({
                                                         onTodoFormHandler,
                                                         restrictedQuantity,
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

    //
    // useEffect(() => {
    //     let timer: number | NodeJS.Timer | undefined
    //     if (title.length >= 100) {
    //         timer = setTimeout(() => {
    //             setState({
    //                 ...state,
    //                 title: ''
    //             })
    //         }, 2000)
    //     }
    //
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [title])
    //
    //
    // useEffect(() => {
    //     if (title.length >= 100) {
    //         dispatch(SetAppErrorAC('Maximum symbols exceeded! 100'))
    //     }
    // }, [title.length])

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
                disabled={restrictedQuantity ? restrictedQuantity[0].data.length >= restrictedQuantity[0].quantity : false}
                color={error || title.length > 100 ? 'secondary' : 'primary'}
                variant={"contained"}
                onClick={addTask}>

                {formName}
            </Button>


        </View>
    )

})


