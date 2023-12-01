export {}

import {useState} from "react";
import {Task} from "../src/components/Task";
import {
    FilterProps,
    PropsType,
    TasksProps,
} from "../src/types/Types";
import {TodoForm} from "../src/components/TodoForm";
import {Button} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import Editable from "../src/components/Editable";
import {TaskControls} from "../src/components/TaskControls";
import {AddTasktAC, EditTaskAC, RemoveAllTasksAC, RemoveTaskAC, ToggleTaskAC} from "../src/store/actions/tasks-actions";
import {ChangeTodolistTitleAC, RemoveTodolistAC} from "../src/store/actions/todos-actions";
import _dispatcher from "../src/utils/dispatcher";
//
// export function TodolistWithReducer({
// setTasks,
// tasksForRender,
// tasksForFilter,
// title,
// setTodo,
// todoListID,
// }: PropsType) {
//
//
//
//     const [filterStatus, setFilter] = useState<FilterProps>("All");
//     const [listRef] = useAutoAnimate<HTMLUListElement>();
//
//     const addTaskInTodo = (taskTitle: string, todoListID: string) => {
//
//         setTasks(AddTasktAC(taskTitle, todoListID))
//
//     };
//
//     const OnDeleteTask = (id: string, todoListId: string) => {
//
//         setTasks(RemoveTaskAC(id, todoListID))
//     };
//
//     const onDeleteTodo = (todoListID: string) => {
//
//         _dispatcher(
//             [todoListID],
//             [setTodo, setTasks],
//             RemoveTodolistAC
//         )
//
//     };
//
//     const onDeleteAllTasks = (todoListId: string) => {
//
//         setTasks(RemoveAllTasksAC(todoListId))
//     };
//
//     const FilterTask = (filter: FilterProps) => {
//         setFilter(filter);
//     };
//
//     const toggleTask = (id: string, todoListId: string) => {
//         setTasks(ToggleTaskAC(id, todoListId))
//     };
//
//     const editTask = (title: string, todoListID: string, taskID: string) => {
//         setTasks(EditTaskAC(title, taskID, todoListID))
//     };
//
//     const editTodoTitle = (title: string, todoListID: string) => {
//         setTodo(ChangeTodolistTitleAC(title, todoListID))
//     };
//
//     const initFilteredTasks = () => {
//         return tasksForRender.filter((task, i: number) => {
//             switch (filterStatus) {
//                 case "All":
//                     return task;
//                 case "Completed":
//                     return task.isDone;
//                 case "Active":
//                     return !task.isDone;
//                 case "First Three":
//                     return task.firstThree;
//                 default:
//                     return task
//             }
//         });
//     };
//
//
//     const TodoElement = !initFilteredTasks().length ? (
//         <h3>No data</h3>
//     ) : (
//         initFilteredTasks().map((t) => (
//             <Task
//                 key={t.id}
//                 data={{
//                     title: t.title,
//                     id: t.id,
//                     editTask,
//                     isDone: t.isDone,
//                     todoListId: todoListID,
//                     toggleTask,
//                     onDelete: OnDeleteTask,
//                 }}
//             />
//         ))
//     );
//
//
//     return (
//         <div className={'todo-item'}>
//             <Editable
//                 title={title}
//                 todoListID={todoListID}
//                 editableType={"h2"}
//                 onSaveEdits={editTodoTitle}
//             />
//
//             <div style={{marginBottom: 20, marginTop: 20}}>
//                 <Button
//                     onClick={() => onDeleteTodo(todoListID)}
//                     size={"small"}
//                     variant="contained"
//                     color="primary"
//                     startIcon={<DeleteIcon/>}
//                 >
//                     Delete
//                 </Button>
//             </div>
//
//             <TodoForm
//                 todoListId={todoListID}
//                 formName="Add  a task"
//                 placeholder="Enter a task name"
//                 onTodoFormHandler={addTaskInTodo}
//             />
//
//
//             <ul ref={listRef}>
//                 {TodoElement}
//             </ul>
//
//
//             <TaskControls
//                 FilterTask={FilterTask}
//                 tasks={tasksForFilter}
//                 onDeleteAllTasks={onDeleteAllTasks}
//                 todoListID={todoListID}
//                 filterStatus={filterStatus}
//
//             />
//
//         </div>
//
//     );
// }
