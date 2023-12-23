import {CatchUIActionsNames, CatchUIActions} from "../actions/ui-actions";

type initialStateType = {
    isError: boolean,
    isLoading: boolean
}

const initialUIState: initialStateType = {
    isError: false,
    isLoading: false,
}

export const catchUIReducer = (state = initialUIState, action: CatchUIActions) => {

    switch (action.type) {
        case CatchUIActionsNames.ERROR_OCCURED: {
            return {
                ...state,
                isError: true,
            }
        }
        case CatchUIActionsNames.ERROR_RESET: {
            return {
                ...state,
                isError: false,
            }
        }

        case CatchUIActionsNames.SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        }


        default:
            return state;
    }
}