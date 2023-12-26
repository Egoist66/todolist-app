import {FC, memo, useEffect, useMemo} from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useStore} from "../../hooks/useStore";
import {SetAppErrorAC, SetAppStatusAC} from "../../store/actions/app-actions";
import {InitDeleteAC} from "../../store/actions/todos-actions";


export const SnackErrorBar: FC<{status: string, error: string | null}> = ({status, error}) => {

    
    const {dispatch} = useStore()

    const isOpen = useMemo(() => {
        return (status === 'failed' || error !==  null)
    }, [status, error])

    const handleClose = () => {
        
        dispatch(SetAppErrorAC(null))
        dispatch(SetAppStatusAC('idle'))
        
    }


    return (
        <>
        
            {isOpen ? <Snackbar onClose={handleClose} autoHideDuration={4000}   open={isOpen}>
            <Alert onClose={handleClose} variant={'filled'} severity="error">
                {error} - Error has occurred!
            </Alert>
        </Snackbar>: null}
        
        </>
    )
}



type SnackBarTodoProps = {
    variant: 'success' | 'error' | 'info' | 'warning'
    isDeleted: boolean
    todoId: string
    todoTitle: string
    message: string
    errorMessage: string
}
export const SnackTodoBar: FC<SnackBarTodoProps> = memo(({isDeleted, todoTitle, todoId, errorMessage, variant, message}) => {
        
    const {dispatch} = useStore()
    if (isDeleted){
        return  (
            <Snackbar open={isDeleted}>
                <Alert variant={'filled'} severity={variant}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }
    return (
        <Snackbar autoHideDuration={3000} onClose={() => {
            dispatch(InitDeleteAC(false, todoId, ''))
        } } open={errorMessage.length > 0}>
            <Alert variant={'filled'} severity={variant}>
                {errorMessage} - Unable to remove {todoTitle} todo!
            </Alert>
        </Snackbar>

    )
})