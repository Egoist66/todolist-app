export {}


// import {FC, useReducer} from "react";
// import "../../App.css";
// import {TodoForm} from "../TodoForm";
// import {Container, Grid} from "@material-ui/core";
// import {Header} from "../Header";
// import {View} from "../../service-components/View/View";
// import {TodolistWithReducer} from "./TodolistWithReducer";
// import {todolistReducer} from "../../store/reducers-v1/todolist-reducer";
// import {tasksReducer} from "../../store/reducers-v1/task-reducer";
// import {AddTodolistAC} from "../../store/actions/todos-actions";
//
//
// export const AppReducer: FC = () => {
//
//     const todoList1 = crypto.randomUUID();
//     const todoList2 = crypto.randomUUID();
//
//     const [todosState, dispatchTodos] = useReducer(todolistReducer, [
//         {id: todoList1, title: "First Todo", filter: "Completed"},
//         {id: todoList2, title: "Second Todo", filter: "All"},
//     ]);
//     const [tasksState, dispatchTasks] = useReducer(tasksReducer, {
//         [todoList1]: [
//             {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true, firstThree: true},
//             {id: crypto.randomUUID(), title: "JS", isDone: true, firstThree: true},
//
//         ],
//
//         [todoList2]: [
//             {id: crypto.randomUUID(), title: "PHP", isDone: true, firstThree: true},
//             {id: crypto.randomUUID(), title: "Sass", isDone: true, firstThree: true},
//
//         ],
//     });
//
//
//     const filteredTasksForEachTodos = () => {
//         return todosState.map((todo) => tasksState[todo.id]);
//     };
//
//
//     const createTodoList = (title: string) => {
//         const id = crypto.randomUUID()
//
//         dispatchTodos(AddTodolistAC(title, id))
//         dispatchTasks(AddTodolistAC(title, id))
//
//
//
//
//
//     };
//
//     const TodoElems = filteredTasksForEachTodos().map((t, i: number) => (
//         <TodolistWithReducer
//             key={todosState[i].id}
//             setTasks={dispatchTasks}
//             tasksForFilter={tasksState}
//             tasksForRender={t}
//             todos={todosState}
//             setTodo={dispatchTodos}
//             todoListID={todosState[i].id}
//             title={todosState[i].title}
//         />
//     ));
//
//     return (
//         <>
//             <Header/>
//
//             <Container fixed>
//                 <View _margin="30px 0px 0px 0px" id="form-view">
//                     <TodoForm
//                         placeholder="Enter a todo title"
//                         formName={"Add new todo"}
//                         onTodoFormHandler={createTodoList}
//                         todoListId={""}
//                     />
//                 </View>
//             </Container>
//
//             <Container fixed>
//                 <Grid className="App">
//
//
//                     {!TodoElems.length ? <h2>No todos</h2> : TodoElems}
//                 </Grid>
//             </Container>
//         </>
//     );
// }
//
