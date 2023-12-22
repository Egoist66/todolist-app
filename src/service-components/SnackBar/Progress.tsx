import {FC, memo} from "react";
import {LinearProgress} from "@material-ui/core";


type Progress = {
    reason : boolean
}
export const Progress: FC<Progress> = memo(({reason}) => {
    return (
            <>

                {reason ? <LinearProgress style={{position: "absolute", left: 0, top: 0, width: '100%'}}  /> : null}


            </>
    )
})