export {}

// import { useEffect, useState } from "react";
// import { Task } from "../Task";
// import {
//   FilterProps,
//   PropsType,
//   TasksProps,
//   TodoListProps,
// } from "../../types/Types";
// import { TodoForm } from "../TodoForm";
// import {Button} from '@material-ui/core'
// import DeleteIcon from "@material-ui/icons/Delete";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
// import Editable from "../Editable";
// import { TaskControls } from "../TaskControls";
//
// export function Todolist({
//   setTasks,
//   tasksForRender,
//   tasksForFilter,
//   title,
//   todos,
//   setTodo,
//   todoListID,
// }: PropsType) {
//
//
//
//   const [filterStatus, setFilter] = useState<FilterProps>("All");
//   const [listRef] = useAutoAnimate<HTMLUListElement>();
//
//   const addTaskInTodo = (title: string, todoListID: string) => {
//     const newTask: TasksProps = {
//       id: crypto.randomUUID(),
//       title: title,
//       isDone: false,
//     };
//
//     const tasksArr = tasksForFilter[todoListID];
//     const newTasks = [newTask, ...tasksArr];
//     tasksForFilter[todoListID] = newTasks;
//
//     setTasks({ ...tasksForFilter });
//   };
//
//   const OnDeleteTask = (id: string, todoListId: string) => {
//     // const taskArr = tasksForFilter[todoListId]
//     // tasksForFilter[todoListId] = taskArr.filter(task => task.id !== id)
//
//     setTasks({
//       ...tasksForFilter,
//       [todoListId]: tasksForFilter[todoListId].filter((task) => task.id !== id),
//     });
//   };
//
//   const onDeleteTodo = (todoListID: string) => {
//     const filteredTodos = todos.filter((t) => t.id !== todoListID);
//     setTodo(filteredTodos);
//     delete tasksForFilter[todoListID];
//   };
//
//   const onDeleteAllTasks = (todoListId: string) => {
//
//     tasksForFilter[todoListId] = [];
//
//     setTasks({ ...tasksForFilter });
//
//
//   };
//
//   const FilterTask = (filter: FilterProps) => {
//     setFilter(filter);
//   };
//
//   const toggleTask = (id: string, todoListId: string) => {
//     const taskArr = tasksForFilter[todoListId];
//     const task = taskArr.find((t) => t.id === id);
//     if (task) {
//       task.isDone = !task.isDone;
//       console.log(task.isDone);
//
//       setTasks({ ...tasksForFilter });
//     }
//   };
//
//   const editTask = (title: string, todoListID: string, taskID: string) => {
//     const tasksArr = tasksForFilter[todoListID];
//     const updatedTask = tasksArr.find((task) => task.id === taskID);
//     if (updatedTask) {
//       updatedTask.title = title;
//       setTasks({ ...tasksForFilter });
//     }
//   };
//
//   const editTodoTitle = (title: string, todoListID: string) => {
//     const updatedTodo = todos.find((todo) => todo.id === todoListID);
//     if (updatedTodo) {
//       updatedTodo.title = title;
//       setTodo([...todos]);
//     }
//   };
//
//   const initFilteredTasks = () => {
//
//     return tasksForRender.filter((task, i: number) => {
//       switch (filterStatus) {
//         case "All":
//           return task;
//         case "Completed":
//           return task.isDone;
//         case "Active":
//           return !task.isDone;
//         case "First Three":
//           return task.firstThree;
//         default:
//           throw new Error("No such filter");
//       }
//     });
//   };
//
//
//
//
//
//   const TodoElement = !initFilteredTasks().length ? (
//     <h3>No data</h3>
//   ) : (
//     initFilteredTasks().map((t) => (
//       <Task
//         key={t.id}
//         data={{
//           title: t.title,
//           id: t.id,
//           editTask,
//           isDone: t.isDone,
//           todoListId: todoListID,
//           toggleTask,
//           onDelete: OnDeleteTask,
//         }}
//       />
//     ))
//   );
//
//
//   return (
//     <div>
//       <Editable
//         title={title}
//         todoListID={todoListID}
//         editableType={"h2"}
//         onSaveEdits={editTodoTitle}
//       />
//
//       <div style={{ marginBottom: 20, marginTop: 20 }}>
//         <Button
//           onClick={() => onDeleteTodo(todoListID)}
//           size={"small"}
//           variant="contained"
//           color="primary"
//           startIcon={<DeleteIcon />}
//         >
//           Delete
//         </Button>
//       </div>
//
//       <TodoForm
//         todoListId={todoListID}
//         formName="Add  a task"
//         placeholder="Enter a task name"
//         onTodoFormHandler={addTaskInTodo}
//       />
//
//
//       <ul ref={listRef}>{TodoElement}</ul>
//
//
//       <TaskControls
//         FilterTask={FilterTask}
//         tasks={tasksForFilter}
//         onDeleteAllTasks={onDeleteAllTasks}
//         todoListID={todoListID}
//         filterStatus={filterStatus}
//
//       />
//
//     </div>
//
//   );
// }
