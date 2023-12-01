
export {}
// import {FC, useReducer, useState} from "react";
// import "../../App.css";
// //import {Todolist} from "./Todolist";
// import {TasksElems, TodoListProps} from "../../types/Types";
// import {TodoForm} from "../TodoForm";
// import {Container, Grid} from "@material-ui/core";
// import {Header} from "../Header";
// import {View} from "../../service-components/View/View";
// import {useTest} from "../../hooks/useTest";
//
//
// export const App: FC = () => {
//
//
//     const todoList1 = crypto.randomUUID();
//     const todoList2 = crypto.randomUUID();
//
//     const [todoLists, setTodo] = useState<TodoListProps[]>([
//         // TodoLists general Interface
//         {id: todoList1, title: "First Todo", filter: "Completed"},
//         {id: todoList2, title: "Second Todo", filter: "All"},
//     ]);
//     const [tasks, setTasks] = useState<TasksElems>({
//         [todoList1]: [
//             {
//                 id: crypto.randomUUID(),
//                 title: "HTML&CSS",
//                 isDone: true,
//                 firstThree: true,
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "JS",
//                 isDone: true,
//                 firstThree: true
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "ReactJS",
//                 isDone: false,
//                 firstThree: true,
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "Next JS",
//                 isDone: true
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "GraphQL",
//                 isDone: false
//             },
//         ],
//
//         [todoList2]: [
//             {
//                 id: crypto.randomUUID(),
//                 title: "PHP",
//                 isDone: true,
//                 firstThree: true
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "Sass",
//                 isDone: true,
//                 firstThree: true,
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "Nuxt",
//                 isDone: false,
//                 firstThree: true,
//             },
//             {
//                 id: crypto.randomUUID(),
//                 title: "Java",
//                 isDone: true
//             },
//         ],
//     });
//
//
//
//     const filteredTasksForEachTodos = () => {
//         return todoLists.map((todo) => tasks[todo.id]);
//     };
//
//
//
//     const createTodoList = (title: string) => {
//         const newTodoList: TodoListProps = {
//             id: crypto.randomUUID(),
//             title: title,
//             filter: "All",
//         };
//
//         setTodo([newTodoList, ...todoLists]);
//         setTasks({
//             ...tasks,
//             [newTodoList.id]: [],
//         });
//
//     };
//
//     const TodoElems = filteredTasksForEachTodos().map((t, i: number) => (
//         <Todolist
//             key={todoLists[i].id}
//             setTasks={setTasks}
//             tasksForFilter={tasks}
//             tasksForRender={t}
//             todos={todoLists}
//             setTodo={setTodo}
//             todoListID={todoLists[i].id}
//             title={todoLists[i].title}
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
