import { FC, memo, useEffect, useMemo } from "react";
import { useStore } from "../hooks/useStore";
import { TodoListRedux } from "./TodoListRedux";
import { Header } from "./Header";
import { Container, Grid } from "@material-ui/core";
import { View } from "../service-components/View/View";
import { TodoForm } from "./TodoForm";
import { todoListAPI } from "../api/todo-lists-api";
import { useStatus } from "../hooks/useStatus";
import { fetchTodos } from "../store/async-thunks/todos-thunks/fetchTodos";
import { createTodoList } from "../store/async-thunks/todos-thunks/createTodoList";
import ErrorBoundary from "../service-components/error-boundary/ErrorBoundary";
import { createTasks } from "../store/async-thunks/tasks-thunks/createTasks";
import Preloader from "../service-components/preloader/preloader";

export const AppLayout: FC = memo(() => {

    const { useAppSelector, dispatch } = useStore()
    const todos = useAppSelector(state => state.todos.todos)
    const { isError, isLoading } = useAppSelector(state => state.ui)




    useEffect(() => {

        dispatch(fetchTodos())

    }, [])



    const TodoElems = useMemo(() => (
        todos.map((t, i: number) => (
            <TodoListRedux
                key={todos[i].id}
                isDeleted={todos[i].isDeleted}
                todoListID={todos[i].id}
                title={todos[i].title}
            />
        ))
    ), [todos])
    return (
        <>
            <Header />


            <Container fixed>
                <View _margin="30px 0px 0px 0px" id="form-view">
                    <TodoForm
                        placeholder="Enter a todo title"
                        formName={"Add new todo"}
                        onTodoFormHandler={(title: string) => dispatch(createTodoList(title))}
                    />
                </View>
            </Container>

            <Container fixed>
                <Grid className="App">

                    <ErrorBoundary
                        onTryhandler={() => dispatch(createTodoList('Try todo, remove then'))}
                        error={isError}>

                        <Preloader isLoading={isLoading} afterSpinner={() => (
                            TodoElems
                        )} />

                    </ErrorBoundary>


                </Grid>
            </Container>
        </>
    )
})