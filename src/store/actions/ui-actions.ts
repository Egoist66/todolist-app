export enum CatchUIActionsNames {
     ERROR_OCCURED = 'ERROR_OCCURED',
     ERROR_RESET = 'ERROR_RESET',
     SET_LOADING = 'SET_LOADING',
     SET_DELETE = 'SET_DELETE'
}



export type CatchUIActions =
     ReturnType<typeof CatchErrorAC> |
     ReturnType<typeof ErrorResetAC> |
     ReturnType<typeof SetLoadingtAC> |
     ReturnType<typeof SetDeletetAC>


export const CatchErrorAC = () => ({
     type: CatchUIActionsNames.ERROR_OCCURED,
}) as const


export const ErrorResetAC = () => ({
     type: CatchUIActionsNames.ERROR_RESET,

}) as const

export const SetLoadingtAC = (isLoading: boolean) => ({
     type: CatchUIActionsNames.SET_LOADING,
     payload: { isLoading }

}) as const

export const SetDeletetAC = (isDeleted: boolean) => ({
     type: CatchUIActionsNames.SET_DELETE,
     payload: { isDeleted }

}) as const