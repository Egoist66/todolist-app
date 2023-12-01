import {action} from '@storybook/addon-actions'
import {TaskTypeProps} from "../types/Types";
import {FC} from "react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {AppLayout} from "../components/AppLayout";


export default {
    title: 'TodoList/Task',
    component: <AppLayout/>,
    tags: ['autodocs'],
}


type TaskStory = TaskTypeProps



 export const AppStory: FC = () => {


    return (

     <Provider store={store}>
         <AppLayout />

     </Provider>

    )
}