import {ChangeEvent, FC, memo, useEffect, useState} from "react"
import {TodoFormPropsType} from "../types/Types"
import {Button, Portal, Snackbar, TextField,} from "@material-ui/core";
import {View} from "../service-components/View/View";
import {LS} from "../utils/utils";
import {Alert} from "@material-ui/lab";
import {useOnline} from "@react-hooks-library/core";
import {useStore} from "../hooks/useStore";

type FormStateType = {
    title: string,
    error: boolean
}

export const TodoForm: FC<TodoFormPropsType> = memo(({
 onTodoFormHandler,
 isDeletedTodo,
 placeholder,
 todoListId,
 formName
 }) => {
    const {get} = LS()

    const [state, setState] = useState<FormStateType>({
        title: '',
        error: false,
    })
    const {error, title} = state
    const isAppOnline = useOnline()
    const {useAppSelector} = useStore()
    const {isAuth} = useAppSelector(state => state.auth)



    const onSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            error: false,
            title: e.currentTarget.value
        })
    }

    const addTask = () => {

        if (title.trim() === '') {
            setState({
                ...state,
                error: true,
            })

            return
        }

        if(!isAppOnline){
            return
        }
        onTodoFormHandler(title, todoListId!)


    }


    useEffect(() => {
        const status = get('app-status')
        if (status === 'succeeded') {
            setState({
                ...state,
                error: false,
                title: ''
            })
            return
        }

        
    }, [get('app-status')])


    return (

        <View className="todo-form">

            <TextField
                error={error}
                variant={'outlined'}
                onKeyDown={(e) => {
                    e.key === 'Enter' && addTask()
                }}
                value={title}
                onChange={onSetTitle}
                disabled={!isAuth}
                id="standard-basic"
                label={placeholder}
            />


            <Button
                size={"small"}
                disabled={(isDeletedTodo || !isAuth)}
                color={error || title.length > 100 ? 'secondary' : 'primary'}
                variant={"contained"}
                onClick={addTask}>

                {formName}
            </Button>

            {title.length >= 80 ? <Portal>
                <Snackbar open={title.length >= 80 && title.length <= 100}>
                    <Alert variant={'filled'} severity={'warning'}>
                        There is an upcoming symbols limit! current - {title.length}, max - 100
                    </Alert>
                </Snackbar>
            </Portal> : null}

        </View>
    )

})


