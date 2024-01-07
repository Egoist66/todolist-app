import {AppThunk} from "../../store";
import {AuthAppApi} from "../../../api/authApp-api";
import {AuthMeAC, isLoggingAC, LoginAppAC, LogOutAppAC, SetAppErrorAC, SetAppStatusAC} from "../../actions/app-actions";
import {handleThunkActions} from "../../../utils/utils";

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
            if (data.resultCode === 0) {
                dispatch(AuthMeAC(data))
            }

        } catch (e) {
            console.log(e)
        }
    }
}
export const authApp = ({remember, password, email}: AuthAppProps): AppThunk => {
    return async (dispatch) => {
        try {
            handleThunkActions({
                type: 'app',
                dispatch: dispatch,
                successActionHandler: [
                    () => SetAppStatusAC('loading'),
                    () => isLoggingAC(true)
                ]
            })
            const data = await AuthAppApi.login({
                password,
                email,
                remember
            })

            handleThunkActions({
                type: 'app',
                dispatch: dispatch,
                resultCode: data.resultCode,
                appErrorActionHandler: [
                    () => SetAppErrorAC(data.messages[0]),
                    () => LoginAppAC(data),
                    () => SetAppStatusAC('failed'),
                    () => isLoggingAC(false)
                ],
                successActionHandler: [
                    () => LoginAppAC(data),
                    () => SetAppStatusAC('succeeded'),
                    () => isLoggingAC(false)
                ],
                sideEffect: [() => dispatch(authMe())]
            })

        } catch (e: any) {
            console.log(e)
            handleThunkActions({
                type: 'network',
                dispatch,
                serverErrorActionHandler: [
                    () => SetAppStatusAC('failed'),
                    () => SetAppErrorAC(e.message),
                    () => isLoggingAC(false)

                ]

            })
        }
    }
}

export const logOutApp = (): AppThunk => {
    return async (dispatch) => {
        try {
            handleThunkActions({
                type: 'app',
                dispatch: dispatch,
                successActionHandler: [() => SetAppStatusAC('loading')]
            })
            const data = await AuthAppApi.logout()

            handleThunkActions({
                type: 'app',
                dispatch,
                resultCode: data.resultCode,
                appErrorActionHandler: [
                    () => SetAppErrorAC(data.messages[0]),
                    () => LogOutAppAC(data),
                    () => SetAppStatusAC('failed'),
                ],
                successActionHandler: [
                    () => LogOutAppAC(data),
                    () => SetAppStatusAC('succeeded')
                ]

            })


        } catch (e: any) {

            handleThunkActions({
                'type': 'network',
                dispatch,
                serverErrorActionHandler: [
                    () => SetAppStatusAC('failed'),
                    () => SetAppErrorAC(e.message)]
            })

        }
    }
}
