import { Checkbox, IconButton } from "@material-ui/core";
import { TaskTypeProps } from "../types/Types";
import DeleteIcon from '@material-ui/icons/Delete';
import Editable from "./Editable";
import { useStore } from "../hooks/useStore";
import { FC, memo } from "react";
import { deleteTasks } from "../store/async-thunks/tasks-thunks/deleteTasks";
import { toggleTasks } from "../store/async-thunks/tasks-thunks/toggleTasks";
import { updateTasks } from "../store/async-thunks/tasks-thunks/updateTasks";


export const Task: FC<TaskTypeProps> = memo(({ data }) => {

    const { id, status, title, todoListId } = data
    const { dispatch } = useStore()

    console.log(status);
    


    return (
        <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
        }} key={id}>

            <Checkbox
                onChange={(e) => dispatch(toggleTasks(todoListId, id,    {

                    status: e.currentTarget.checked ? 2 : 1,
                    title,
                    priority: 1,
                    startDate: new Date().toDateString(),
                    description: 'task',
                    deadline: ''

                }))}
                id={id}
                className={'task_input'}
                checked={status === 2}
                data-checked={status === 2}
                name="task-status"
                color="primary"
            />

                <Editable
                    editableType={'span'}
                    title={title}
                    todoListID={todoListId}
                    taskID={id}
                    onSaveEdits={(_title, todoListID, id) => {
                        if(_title === title){
                            return
                        }
                        dispatch(updateTasks(todoListID, id, _title, status))
                    }}
                />

            <IconButton onClick={() => dispatch(deleteTasks(todoListId, id))} aria-label="delete">
                <DeleteIcon />
            </IconButton>


        </li>
    )

})