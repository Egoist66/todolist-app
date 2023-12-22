import {FC} from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useOnline} from "@react-hooks-library/core";

export const OfflineBoundary: FC = () => {

    const isOnline = useOnline()

    const showIsOnlineApp = () => {
        if (!isOnline) {
            return (
                <Snackbar autoHideDuration={4000} open={!isOnline}>
                    <Alert variant={'filled'} severity="error">
                        App is not Online! Check your connection
                    </Alert>
                </Snackbar>
            )
        }
    }

    return (
        <>
            {showIsOnlineApp()}

        </>
    )
}