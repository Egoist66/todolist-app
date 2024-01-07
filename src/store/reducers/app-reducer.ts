import {AppActionsNames, AppStatusActions} from "../actions/app-actions";

export type Statuses = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    status: Statuses
    isAppInitialized: boolean
    error: string | null
}

const initialState: initialStateType = {
    status: 'idle',
    isAppInitialized: false,
    error: null
}

export const appReducer = (state = initialState, action: AppStatusActions): initialStateType => {
    switch (action.type) {
        case AppActionsNames["APP/SET-STATUS"]:
            return {...state, status: action.payload.status}
        case AppActionsNames["APP/SET-ERROR"]:
            return  {...state, error: action.payload.error}
        case AppActionsNames["APP/INITIALIZE"]: {
            return  {...state, isAppInitialized: action.payload.isInitialized}
        }

        default: {
            return  {...state}
        }
    }
}