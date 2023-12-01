import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {rootReducer, store} from "../store/store";

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useStore = () => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

    const dispatch = useAppDispatch()


    return {
        dispatch,
        useAppSelector
    }
}