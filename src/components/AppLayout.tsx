import {FC, memo, useState} from "react";
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
import {TodoListRedux} from "./TodoListRedux";
import {Progress} from "../service-components/SnackBar/Progress";
import {OfflineBoundary} from "../service-components/SnackBar/OfflineBoundary";


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
                <Grid  className="App">

                    {todos.map((todo, i: number) => (


                        <TodoListRedux
                            key={todos[i].id}
                            todo={todo}
                        />
                    ))}


                </Grid>
            </Container>

            <SnackErrorBar/>
            <Progress reason={status === "loading"}/>
            <OfflineBoundary/>


        </>
    )
})


function ObjectConstructor() {
    const [inputs, setInputs] = useState([{key: '', value: ''}]);
    const [objectData, setObjectData] = useState({});

    const addInput = () => {
        setInputs([...inputs, {key: '', value: ''}]);
    };

    const handleChange = (index: number, key: string, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = {key, value};
        setInputs(newInputs)
    };

    const handleGenerateJson = () => {
        const data: any = {};
        inputs.forEach((input) => {
            data[input.key] = input.value;
        });
        setObjectData(data);
    };

    return (
        <div>
            <button onClick={addInput}>Добавить инпут</button>
            <button onClick={handleGenerateJson}>Сгенерировать JSON</button>
            {inputs.map((input, index) => (
                <div key={index}>
                    <input
                        value={input.key}
                        placeholder="Ключ"
                        onChange={(e) => handleChange(index, e.target.value, input.value)}
                    />
                    <input
                        value={input.value}
                        placeholder="Значение"
                        onChange={(e) => handleChange(index, input.key, e.target.value)}
                    />
                </div>
            ))}

            <pre>{JSON.stringify(objectData, null, 2)}</pre>
        </div>
    );
}