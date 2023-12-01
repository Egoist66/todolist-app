import { Checkbox, IconButton } from "@material-ui/core";
import { TaskTypeProps } from "../types/Types";
import DeleteIcon from '@material-ui/icons/Delete';
import Editable from "./Editable";
import { useStore } from "../hooks/useStore";
import { FC, memo } from "react";
import { todolistTasksAPI } from "../api/todolist-tasks-api";
import { RemoveTaskAC } from "../store/actions/tasks-actions";
import { deleteTasks } from "../store/async-thunks/tasks-thunks/deleteTasks";


export const Task: FC<TaskTypeProps> = memo(({ data }) => {

    const { id, status, title, todoListId } = data
    const { dispatch } = useStore()


    return (
        <li key={id}>

            <Checkbox
                onChange={(e) => todolistTasksAPI.updateCompletedTasks(dispatch, todoListId, id, {

                    status: e.currentTarget.checked ? 2 : 1,
                    title,
                    priority: 1,
                    startDate: new Date().toDateString(),
                    description: 'task',
                    deadline: ''

                })}
                id={id}
                className={'task_input'}
                checked={status === 2}
                data-checked={status === 2}
                name="task-status"
                color="primary"
            />

            <label htmlFor={id} className={'task_name'}>
                <Editable
                    editableType={'span'}
                    title={title}
                    todoListID={todoListId}
                    taskID={id}
                    onSaveEdits={(title, todoListID, id) =>
                        todolistTasksAPI.updateTasks(dispatch, todoListID, id, title
                        )}
                />
            </label>

            <IconButton onClick={() => dispatch(deleteTasks(todoListId, id))} aria-label="delete">
                <DeleteIcon />
            </IconButton>


        </li>
    )

})