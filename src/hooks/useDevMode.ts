import {useCallback, useEffect} from "react";
import {useStore} from "./useStore";

type useDevModeProps = {
    afterIsDevOff?: () => void
    afterIsDevOn?: () => void
}
export const useDevMode = ({afterIsDevOn, afterIsDevOff}: useDevModeProps = {}) => {
    const {useAppSelector} = useStore()
    const isDevMode = useAppSelector(state => state.appDev.dev)

    const initDevMode = ({afterIsDevOn, afterIsDevOff}: useDevModeProps) => {
        if (isDevMode) {
            if (afterIsDevOn){
                afterIsDevOn()
            }
            return
        }

        if (afterIsDevOff){
            afterIsDevOff()
        }
    }

    useEffect(() => {

            if (isDevMode){
                if (afterIsDevOn){
                    afterIsDevOn()
                }

                return
            }
            if (afterIsDevOff){
                afterIsDevOff()
            }


    }, [isDevMode])

    return {
        initDevMode
    }
}