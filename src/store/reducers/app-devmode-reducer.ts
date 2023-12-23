type initialState = {
    dev: boolean
}

const initialAppDevModeState: initialState = {
    dev: false
}

export const AppDevModeReducer = (state = initialAppDevModeState, action: AppDevModeAction):initialState => {

    switch (action.type) {

        case "SET-DEV": {
            return  {
                ...state,
                dev: action.payload.dev
            }
        }

        default:
            return state

    }
}


export type AppDevModeAction = ReturnType<typeof setDevMode>

export const setDevMode = (dev: boolean) => ({
    type: 'SET-DEV', payload: {dev}
}) as const