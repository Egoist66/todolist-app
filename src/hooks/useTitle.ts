import {ChangeEvent, useState} from "react";

type useTitleState = {
    [key: string]: string
}
type useTitleProps = {
    field: string
}
export const useTitle = (props: useTitleProps) => {

   const [state, setState] = useState<useTitleState>({
       [props.field]: ''
   })

   const setTitle = (e: ChangeEvent<HTMLInputElement>) => {
       setState({
           ...state,
           [props.field]: e.currentTarget.value
       })
   }

   const title = state[props.field]

   return [
       title,
       setTitle


   ]

}