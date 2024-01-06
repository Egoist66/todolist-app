import {FC} from "react";
import {useStore} from "../hooks/useStore";
import {Header} from "./Header";
import {Container, Grid} from "@material-ui/core";
import {View} from "../service-components/View/View";
import {TodoForm} from "./TodoForm";
import {fetchTodos} from "../store/async-thunks/todos-thunks/fetchTodos";
import {createTodoList} from "../store/async-thunks/todos-thunks/createTodoList";
import {SnackErrorBar} from "../service-components/SnackBar/SnackBar";
import {useDevMode} from "../hooks/useDevMode";
import {SetTodolistAC} from "../store/actions/todos-actions";
import {v1} from "uuid";
import {Progress} from "../service-components/SnackBar/Progress";
import {OfflineBoundary} from "../service-components/SnackBar/OfflineBoundary";
import {AppRoutes} from "./AppRoutes";


export const AppLayout: FC = () => {

    const {useAppSelector, dispatch} = useStore()
    const {status, error} = useAppSelector(state => state.app)


    const {initDevMode} = useDevMode({
        afterIsDevOff: () => dispatch(fetchTodos())
    })


    return (
        <>

            <Header/>

            {/*<Login />*/}

            <Container fixed>
                <View _margin="30px 0px 0px 0px" id="form-view">
                    <TodoForm
                        placeholder="Enter a todo title"
                        formName={"Add new todo"}
                        onTodoFormHandler={(title: string) => {
                            initDevMode({
                                afterIsDevOff: () => dispatch(createTodoList(title)),
                                afterIsDevOn: () => dispatch(SetTodolistAC(title, v1()))
                            })
                        }}
                    />
                </View>
            </Container>

            <Container fixed>
                <Grid className="App">

                    <AppRoutes/>

                </Grid>
            </Container>

            {<SnackErrorBar error={error} status={status}/>}
            <Progress reason={status === "loading"}/>
            <OfflineBoundary/>


        </>
    )
}


