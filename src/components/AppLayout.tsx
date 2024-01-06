import {FC, useEffect} from "react";
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
import {useLocation} from "react-router-dom";
import {authMe} from "../store/async-thunks/auth-thunks/authApp";


export const AppLayout: FC = () => {
    const {dispatch, useAppSelector} = useStore()
    const {status, error} = useAppSelector(state => state.app)
    const {pathname} = useLocation()
    const {isAuth} = useAppSelector(state => state.auth)


    const {initDevMode} = useDevMode({
        afterIsDevOff: () => () => {}
    })



    useEffect(() => {
        if (isAuth){
            dispatch(fetchTodos())
        }
        dispatch(fetchTodos())
    }, [isAuth]);
    useEffect(() => {

        dispatch(authMe())
    }, [isAuth])

    return (
        <>

            <Header/>


            <Container fixed>
                <View _margin="30px 0px 0px 0px" id="form-view">
                    {pathname === '/login' ? null : <TodoForm
                        placeholder="Enter a todo title"
                        formName={"Add new todo"}
                        onTodoFormHandler={(title: string) => {
                            initDevMode({
                                afterIsDevOff: () => dispatch(createTodoList(title)),
                                afterIsDevOn: () => dispatch(SetTodolistAC(title, v1()))
                            })
                        }}
                    />}
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


