import {FilterProps, TodoListProps} from "../types/Types";
import {FC, memo, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Task} from "./Task";
import Editable from "./Editable";
import {Button, Portal} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {TodoForm} from "./TodoForm";
import {TaskControls} from "./TaskControls";
import {useTodoList} from "../hooks/useTodoList";
import {useStore} from "../hooks/useStore";
import {View} from "../service-components/View/View";
import Text from "../service-components/Text/Text";
import {fetchTasks} from "../store/async-thunks/tasks-thunks/fetchTasks";
import {updateTodoList} from "../store/async-thunks/todos-thunks/updateTodolist";
import {ChangeTodolistTitleAC, RemoveTodolistAC, RequestRemoveTodolistAC} from "../store/actions/todos-actions";
import {createTasks} from "../store/async-thunks/tasks-thunks/createTasks";
import {useDevMode} from "../hooks/useDevMode";
import {AddTasktAC} from "../store/actions/tasks-actions";
import {v1} from "uuid";
import {SnackTodoBar} from "../service-components/SnackBar/SnackBar";


type TodoListPropsType = {
    todo: TodoListProps
}

export const TodoListRedux: FC<TodoListPropsType> = memo(({todo}) => {

    const [filterStatus, setFilter] = useState<FilterProps>("All");
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    const {useAppSelector, dispatch} = useStore()
    const tasks = useAppSelector(state => state.tasks)
    const {onDeleteAllTasks} = useTodoList()

    const {initDevMode} = useDevMode({
        afterIsDevOff: () => dispatch(fetchTasks(todo.id))

    })


    const initFilteredTasks = () => {
        return tasks[todo.id].filter((task, i: number) => {
            switch (filterStatus) {
                case "All":
                    return task;
                case "Completed":
                    return task.status === 2;
                case "Active":
                    return (task.status === 0) || (task.status === 1);
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
                    todoListId: todo.id,
                }}
            />
        ))
    );


    return (
        <View className={todo.isDeleted ? 'deleting-todo todo-item' : 'todo-item'}>

            <Editable
                title={todo.title}
                taskID={''}
                todoListID={todo.id}
                editableType={"h2"}
                onSaveEdits={(_title, todoListID) => {
                    if (_title === todo.title) {
                        return
                    }
                    initDevMode({
                        afterIsDevOff: () => dispatch(updateTodoList(todoListID, _title)),
                        afterIsDevOn: () => dispatch(ChangeTodolistTitleAC(_title, todoListID))
                    })
                }}

            />


            <View _margin={'20px 0px 20px 0px'}>
                <Button
                    onClick={() => {
                        initDevMode({
                            afterIsDevOff: () => dispatch(RequestRemoveTodolistAC(todo.id)),
                            afterIsDevOn: () => dispatch(RemoveTodolistAC(todo.id))
                        })
                    }}
                    size={"small"}
                    variant="outlined"
                    color="secondary"
                    disabled={todo.isDeleted}
                    startIcon={<DeleteIcon fontSize={'large'}/>}
                >
                    Delete
                </Button>
            </View>

            <TodoForm
                todoListId={todo.id}
                isDeletedTodo={todo.isDeleted}
                formName="Add  a task"
                placeholder="Enter a task name"
                onTodoFormHandler={(title, todoListId) => {
                    initDevMode({
                        afterIsDevOff: () => dispatch(createTasks({title, todoListID: todoListId,})),
                        afterIsDevOn: () => dispatch(AddTasktAC({
                            title,
                            todoListId,
                            id: v1(),
                            status: 0
                        }))
                    })
                }}
            />


            <ul ref={listRef}>
                {TodoElement}
            </ul>


            <TaskControls
                FilterTask={setFilter}
                tasks={tasks}
                onDeleteAllTasks={onDeleteAllTasks}
                todoListID={todo.id}
                filterStatus={filterStatus}

            />

            <Portal>
                 <SnackTodoBar
                    isDeleted={todo.isDeleted}
                    todoId={todo.id}
                    todoTitle={todo.title}
                    errorMessage={todo.info ? todo.info : ''}
                    variant={todo.isDeleted ? 'success': 'error'}
                    message={'Todo successfully deleted!'}
                />

            </Portal>

        </View>

    );
})