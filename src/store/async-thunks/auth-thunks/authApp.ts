import {AppThunk} from "../../store";
import {AuthAppApi} from "../../../api/authApp-api";
import {AuthMeAC, LoginAppAC} from "../../actions/app-actions";
import {fetchTodos} from "../todos-thunks/fetchTodos";

export type AuthAppProps = {
    email: string
    password: string
    remember: boolean,
    captcha?: string
}

export const authMe = (): AppThunk => {
    return async (dispatch) => {
        try {

            const data = await AuthAppApi.authMe()
            if (data.resultCode === 0){
                dispatch(AuthMeAC(data))
            }

        }
        catch (e){
            console.log(e)
        }
    }
}
export const authApp = ({remember, password, email}: AuthAppProps): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await AuthAppApi.login({
                password,
                email,
                remember
            })
            dispatch(LoginAppAC(data))
            dispatch(authMe())
        }
        catch (e){
            console.log(e)
        }
    }
}

