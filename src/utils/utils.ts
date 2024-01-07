import {AppDispatch} from "../hooks/useStore"
import {AppActions} from "../store/store"

export const setGlobalProperty = (obj: any, value: any[], ...props: string[]) => {
    props.forEach((prop, i: number) => Object.defineProperties(obj, {
        [prop]: {
            value: value[i]
        }
    }))
}

type Action = {
    type: string
}
export const logActions = (action: Action, type: string, payload: any) => {
    switch (action.type) {
        case type:
            console.table({action: type, payload, time: new Date().toString()})

            break

        default:
            throw new Error(`Unknown --${type}-- action type was dispatched!`)
    }
}


export const push = (prev: Array<any>) => {
    return (value: any) => {
        const clone = [...prev];
        clone.push(value);

        return () => {
            return clone
        }

    }
}


type Update = {
    [key: string]: any
}


type UpdateProps = {
    prevState: any
    updateConfig: {
        name: string
        callback?: () => any
        payload: any,
        foundProp: {
            name: string,
            value: any
        }

    }
}
export const Immutable = () => {
    let isToggled = false
    const toggle = () => {
        isToggled = !isToggled
        return isToggled
    }

    const update = (find: boolean, {prevState, updateConfig}: UpdateProps) => {
        if (find) {
            return {
                ...prevState,
                [updateConfig.name]: prevState[updateConfig.name]
                    .map((item: any) => item.id === updateConfig.payload ? {
                        ...item,
                        [updateConfig.foundProp.name]: updateConfig.foundProp.value
                    } : item)
            }
        }

        return {
            ...prevState,
            [updateConfig.name]: updateConfig.callback ? updateConfig.callback() : null
        }
    }


    return {
        update,
        toggle
    }
}


export type handleProps = {
    type: 'app' | 'network'
    resultCode?: number
    dispatch: AppDispatch
    appErrorActionHandler?: Array<() => AppActions>,
    serverErrorActionHandler?: Array<() => AppActions>
    successActionHandler?: Array<() => AppActions>,
    sideEffect?: [() => void]
}
export const handleThunkActions = ({
dispatch,
resultCode,
sideEffect,
appErrorActionHandler,
successActionHandler,
serverErrorActionHandler,
type
}: handleProps) => {
    switch (type) {
        case "app":
            if (resultCode === 1) {
                appErrorActionHandler?.forEach((h, index) => {
                    dispatch(h())

                    if (sideEffect) {

                        sideEffect[0]()
                    }

                    return
                })
                return
            }

            successActionHandler?.forEach((h, index) => {

                dispatch(h())

                if (sideEffect) {
                    sideEffect[0]()
                }
            })

            break
        case "network":
            serverErrorActionHandler?.forEach(h => {
                dispatch(h())
            })
            break


    }
}


export const LS = () => {
    const ls = localStorage;

    const save = (key: string, value: any, flush?: boolean) => {
        try {
            if (flush) {
                ls.removeItem(key)
                ls.setItem(key, JSON.stringify(value));
                return
            }
            ls.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e)

        }
    };

    const remove = (key: string) => {
        ls.removeItem(key);
    };

    const get = (key: string) => {
        const item = ls.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
    };

    const exist = (key: string) => {
        if (key in ls) {
            return true
        } else {
            return false
        }
    }

    return {
        save,
        remove,
        get,
        ls,
        exist
    };
};

export const delay = (ms: number) => {
    return new Promise((res, rej) => {
        const timer = setTimeout(() => {
            res(1)
            clearTimeout(timer)
        }, ms)
    })
}
