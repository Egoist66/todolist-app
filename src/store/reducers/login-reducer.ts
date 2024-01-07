import {AppActionsNames, AppStatusActions} from "../actions/app-actions";

export type AuthInitialStateType = {
    resultCode: number
    messages: string[],
    isAuth?: boolean
    fieldsErrors: string[],
    data: {
        id?: number,
        email?: string,
        login?: string
    }
}

const initialState = {
    resultCode: 0,
    messages: [],
    isAuth: false,
    fieldsErrors: [],
    data: {}
} as AuthInitialStateType


export const loginReducer = (state = initialState, action: AppStatusActions): AuthInitialStateType => {
    switch (action.type) {

        case AppActionsNames["APP/AUHTME"]: {
            const {data} = action.payload
            return {
                ...state,
                ...data,
                isAuth: data.resultCode === 0

            }
        }
        case AppActionsNames["APP/LOGIN"]: {
            const {data} = action.payload

            return  {
                ...state,
                ...data
            }
        }

        case AppActionsNames["APP/LOGINOUT"]: {
            const {data} = action.payload

            return  {
                ...state,
                isAuth: false,
                ...data
            }
        }

        default: {
            return state
        }

    }
}