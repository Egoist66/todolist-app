import {Store} from "redux";

export const PreloadedStore = () => {

    const persist = (key: string, store: Store) => {
        if (!store.getState().appDev.dev){
            localStorage.removeItem('root')
            return
        }
        else {
            localStorage.setItem(key, JSON.stringify(store.getState()))

        }


    }

    const preloadStore = (key: string) => {
        return () => {
            const persistedString = localStorage.getItem(key)
            if(persistedString){
                return JSON.parse(persistedString)
            }
        }
    }

    return {
        persist,
        preloadStore
    }
}