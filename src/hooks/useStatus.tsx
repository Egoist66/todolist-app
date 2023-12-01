import {ReactNode, useState} from "react";

export type useStatusState = {

    status: 'pending' | 'success' | 'error' | 'limit'
    message: string | ReactNode

}

export const useStatus = () => {

    const [state, setStatus] = useState<useStatusState>({
        status: 'pending',
        message: <h2>Loading...</h2>
    })



    return {
        ...state,
        setStatus
    }

}