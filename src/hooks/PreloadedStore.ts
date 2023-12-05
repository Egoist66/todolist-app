import {Store} from "redux";

export const PreloadedStore = () => {

    const persist = (key: string, store: Store) => {
           localStorage.setItem(key, JSON.stringify(store.getState()))

    }

    const preloadStore = (key: string) => {
        return () => {
            const persistedString = localStorage.getItem(key)
            if(persistedString){
                const parsedStore = JSON.parse(persistedString)

                return parsedStore
            }
        }
    }

    return {
        persist,
        preloadStore
    }
}