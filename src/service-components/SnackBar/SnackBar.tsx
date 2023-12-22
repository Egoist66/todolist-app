import {FC, memo, SyntheticEvent} from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useStore} from "../../hooks/useStore";
import {SetAppErrorAC} from "../../store/actions/app-actions";


export const SnackErrorBar: FC = memo(() => {

    const {useAppSelector, dispatch} = useStore()
    const error = useAppSelector(state => state.app.error)

    const isOpen = error !== null

    const handleClose = (e: SyntheticEvent, reason?: string) => {
        dispatch(SetAppErrorAC(null))
    }

    return (
        <Snackbar onClose={handleClose} autoHideDuration={4000} open={isOpen}>
            <Alert onClose={handleClose} variant={'filled'} severity="error">
                {error} - Error has occurred!
            </Alert>
        </Snackbar>
    )
})