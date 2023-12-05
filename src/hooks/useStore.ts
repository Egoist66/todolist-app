import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActions, rootReducer, store} from "../store/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActions>

export const useStore = () => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

    const dispatch = useAppDispatch()


    return {
        dispatch,
        useAppSelector
    }
}