import {Statuses} from "../reducers/app-reducer";

export enum AppActionsNames  {
    "APP/SET-STATUS" = "APP/SET-STATUS",
    "APP/SET-ERROR" = "APP/SET-ERROR"
}


export type AppStatusActions = ReturnType<typeof SetAppStatusAC> | ReturnType<typeof SetAppErrorAC>


export const SetAppStatusAC = (status: Statuses) => ({
    type: AppActionsNames["APP/SET-STATUS"], payload: {status}
}) as const
export const SetAppErrorAC = (error: string | null ) => ({
    type: AppActionsNames["APP/SET-ERROR"], payload: {error}
}) as const