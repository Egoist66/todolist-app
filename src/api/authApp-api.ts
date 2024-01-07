import {instance} from "./todo-lists-api";
import {AuthAppProps} from "../store/async-thunks/auth-thunks/authApp";

export type AuthOperationResponse<T> = {
    resultCode: number
    fieldsErrors: string[],
    messages: string[],
    data: T
}

export const AuthAppApi = {
    async login({email, password, remember}: AuthAppProps) {
        const {data} = await instance.post<AuthOperationResponse<{ id?: number }>>('auth/login', {email, password, rememberMe: remember})
        return data
    },

    async authMe() {
        const {data} = await instance.get<AuthOperationResponse<{ id: number, email: string, login: string }>>('auth/me')
        return data
    },
    async logout(){
        const {data} = await instance.delete<AuthOperationResponse<{}>>('auth/login')
        return data


    }
}