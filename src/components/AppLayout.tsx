import {FC, memo} from "react";
import {useStore} from "../hooks/useStore";
import {Header} from "./Header";
import {Container, Grid} from "@material-ui/core";
import {View} from "../service-components/View/View";
import {TodoForm} from "./TodoForm";
import {fetchTodos} from "../store/async-thunks/todos-thunks/fetchTodos";
import {createTodoList} from "../store/async-thunks/todos-thunks/createTodoList";
import ErrorBoundary from "../service-components/error-boundary/ErrorBoundary";
import Preloader from "../service-components/preloader/preloader";
import {SnackErrorBar} from "../service-components/SnackBar/SnackBar";
import {useDevMode} from "../hooks/useDevMode";
import {SetTodolistAC} from "../store/actions/todos-actions";
import {v1} from "uuid";
import {TodoListRedux} from "./TodoListRedux";


export const AppLayout: FC = memo(() => {

    const {useAppSelector, dispatch} = useStore()
    const todos = useAppSelector(state => state.todos.todos)
    const {status} = useAppSelector(state => state.app)

    const {initDevMode} = useDevMode({
        afterIsDevOff: () => dispatch(fetchTodos())
    })


    return (
        <>

            <Header/>


            <Container fixed>
                <View _margin="30px 0px 0px 0px" id="form-view">
                    <TodoForm
                        placeholder="Enter a todo title"
                        restrictedQuantity={[{
                            data: todos,
                            quantity: 10
                        }]}
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
                <Grid style={{justifyContent: status === 'failed' ? 'center': 'flex-start'}} className="App">

                    <ErrorBoundary
                        onTryhandler={() => dispatch(fetchTodos())}
                        error={status}>

                        <Preloader isLoading={status} afterSpinner={() => (
                            todos.map((todo, i: number) => (
                                <TodoListRedux
                                    key={todos[i].id}
                                    todo={todo}
                                />
                            ))
                        )}/>

                    </ErrorBoundary>


                </Grid>
            </Container>

            <SnackErrorBar/>

        </>
    )
})