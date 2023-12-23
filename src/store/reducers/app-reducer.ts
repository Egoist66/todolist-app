import {AppActionsNames, AppStatusActions} from "../actions/app-actions";

export type Statuses = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    status: Statuses
    error: string | null
}

const initialState: initialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state = initialState, action: AppStatusActions): initialStateType => {
    switch (action.type) {
        case AppActionsNames["APP/SET-STATUS"]:
            return {...state, status: action.payload.status}
        case AppActionsNames["APP/SET-ERROR"]:
            return  {...state, error: action.payload.error}

        default: {
            return  {...state}
        }
    }
}