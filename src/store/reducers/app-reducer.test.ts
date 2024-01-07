import {appReducer, initialStateType} from "./app-reducer";
import {SetAppErrorAC, SetAppStatusAC} from "../actions/app-actions";

let startState: initialStateType;

beforeEach(() => {
    startState = {
        error: null,
        isAppInitialized: false,
        status: 'idle'
    }
})

test('Error message should be set', () => {
    const endState = appReducer(startState, SetAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
})

test('Status should be correctly set', () => {
    const endState = appReducer(startState, SetAppStatusAC('loading'))

    expect(endState.status).toEqual('loading')
})