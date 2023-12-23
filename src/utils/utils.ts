import { AppDispatch } from "../hooks/useStore"
import { AppActions } from "../store/store"

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
        if(find){
            return {
                ...prevState,
                [updateConfig.name]: prevState[updateConfig.name]
                    .map((item: any) => item.id === updateConfig.payload ? {...item, [updateConfig.foundProp.name]:updateConfig.foundProp.value }: item)
            }
        }

        return {
            ...prevState,
            [updateConfig.name]: updateConfig.callback ? updateConfig.callback(): null
        }
    }


    return {
        update,
        toggle
    }
}


type handleProps = {
    type: 'app' | 'network'
    resultCode?: number
    dispatch: AppDispatch
    appErrorActionHandler?: Array<() => AppActions>,
    serverErrorActionHandler?: Array<() => AppActions>
    successActionHandler?: Array<() => AppActions>
}
export const handleThunkActions = ({dispatch, resultCode, appErrorActionHandler, successActionHandler, serverErrorActionHandler, type}: handleProps) => {
    switch(type){
        case "app":
                if(resultCode === 1){
                    appErrorActionHandler?.forEach(h => {
                        dispatch(h())
                        return
                    })
                    return
                }
                
                successActionHandler?.forEach(h => {
                    
                    dispatch(h())
                })
                
            break
        case "network":
            serverErrorActionHandler?.forEach(h => {
                dispatch(h())
            })
            break


    }
}