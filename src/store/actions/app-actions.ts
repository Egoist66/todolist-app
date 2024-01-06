import {Statuses} from "../reducers/app-reducer";
import {AuthInitialStateType} from "../reducers/login-reducer";

export enum AppActionsNames  {
    "APP/SET-STATUS" = "APP/SET-STATUS",
    "APP/SET-ERROR" = "APP/SET-ERROR",
    "APP/LOGIN" = "APP/LOGIN",
    "APP/LOGINOUT" = "APP/LOGINOUT",
    "APP/AUHTME" = "APP/AUHTME"
}


export type AppStatusActions = ReturnType<typeof SetAppStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof LoginAppAC>
    | ReturnType<typeof LogOutAppAC>
    | ReturnType<typeof AuthMeAC>


export const SetAppStatusAC = (status: Statuses) => ({
    type: AppActionsNames["APP/SET-STATUS"], payload: {status}
}) as const
export const SetAppErrorAC = (error: string | null ) => ({
    type: AppActionsNames["APP/SET-ERROR"], payload: {error}
}) as const

export const LoginAppAC = (data: AuthInitialStateType) => ({
    type: AppActionsNames["APP/LOGIN"], payload: {data}
}) as const
export const LogOutAppAC = (data: AuthInitialStateType) => ({
    type: AppActionsNames["APP/LOGINOUT"], payload: {data}
}) as const

export const AuthMeAC = (data: AuthInitialStateType) => ({
    type: AppActionsNames["APP/AUHTME"], payload: {data}
}) as const