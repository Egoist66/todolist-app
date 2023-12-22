import { FilterProps, PropsType } from "../types/Types";
import { FC, memo, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Task } from "./Task";

import Editable from "./Editable";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { TodoForm } from "./TodoForm";
import { TaskControls } from "./TaskControls";
import { useTodoList } from "../hooks/useTodoList";
import { useStore } from "../hooks/useStore";
import { View } from "../service-components/View/View";
import Text from "../service-components/Text/Text";
import { fetchTasks } from "../store/async-thunks/tasks-thunks/fetchTasks";
import { updateTodoList } from "../store/async-thunks/todos-thunks/updateTodolist";
import { RequestRemoveTodolistAC } from "../store/actions/todos-actions";
import { createTasks } from "../store/async-thunks/tasks-thunks/createTasks";
import {SetAppErrorAC} from "../store/actions/app-actions";


export const TodoListRedux: FC<PropsType> = memo(({ title, isDeleted, todoListID }) => {

    const [filterStatus, setFilter] = useState<FilterProps>("All");
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    const { useAppSelector, dispatch } = useStore()
    const tasks = useAppSelector(state => state.tasks)
    const { onDeleteAllTasks } = useTodoList()



    const initFilteredTasks = () => {
        return tasks[todoListID].filter((task, i: number) => {
            switch (filterStatus) {
                case "All":
                    return task;
                case "Completed":
                    return task.status === 2;
                case "Active":
                    return (task.status ===  0) || (task.status === 1);
                default:
                    return task
            }
        });
    };


    const TodoElement = !initFilteredTasks().length ? (
        <Text type={'h2'}>No data</Text>
    ) : (
        initFilteredTasks().map((t) => (
            <Task
                key={t.id}
                data={{
                    title: t.title,
                    id: t.id,
                    status: t.status,
                    todoListId: todoListID,
                }}
            />
        ))
    );


    useEffect(() => {
        dispatch(fetchTasks(todoListID))
    }, [])



    return (
        <View className={isDeleted ? 'deleting-todo todo-item' : 'todo-item'}>

            <Editable
                title={title}
                taskID={''}
                todoListID={todoListID}
                editableType={"h2"}
                onSaveEdits={(_title, todoListID) => {
                    if(_title === title){
                        return
                    }
                    dispatch(updateTodoList(todoListID, _title))
                }}

            />




            <View _margin={'20px 0px 20px 0px'}>
                <Button
                    onClick={() => dispatch(RequestRemoveTodolistAC(todoListID))}
                    size={"small"}
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </View>

            <TodoForm
                todoListId={todoListID}
                formName="Add  a task"
                placeholder="Enter a task name"
                onTodoFormHandler={(title, todoListId) => {
                    dispatch(createTasks({
                        title,
                        todoListID: todoListId,

                    }))
                }}
            />




            <ul ref={listRef}>
                {TodoElement}
            </ul>


            <TaskControls
                FilterTask={setFilter}
                tasks={tasks}
                onDeleteAllTasks={onDeleteAllTasks}
                todoListID={todoListID}
                filterStatus={filterStatus}

            />

        </View>

    );
})