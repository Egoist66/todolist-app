import {FC, memo, useState} from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

type SnackbarProps = {
    error: boolean
    entity: string
}
export const SnackBar: FC<SnackbarProps> = memo(({error, entity}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Snackbar onClose={() => setOpen(false)} autoHideDuration={2000} open={open}>
            {error ? <Alert onClose={() => setOpen(false)} variant={'filled'} severity="error">
                {`Can not create ${entity}! Check fields`}
            </Alert> : <Alert onClose={() => setOpen(false)}  variant={'filled'} severity="success">
                {`${entity} created!`}
            </Alert>}
        </Snackbar>
    )
})