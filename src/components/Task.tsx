import {Checkbox, IconButton, LinearProgress, Portal} from "@material-ui/core";
import {TaskTypeProps} from "../types/Types";
import DeleteIcon from '@material-ui/icons/Delete';
import Editable from "./Editable";
import {useStore} from "../hooks/useStore";
import {FC, memo} from "react";
import {deleteTasks} from "../store/async-thunks/tasks-thunks/deleteTasks";
import {toggleTasks} from "../store/async-thunks/tasks-thunks/toggleTasks";
import {updateTasks} from "../store/async-thunks/tasks-thunks/updateTasks";
import {useDevMode} from "../hooks/useDevMode";
import {EditTaskAC, RemoveTaskAC, ToggleTaskAC} from "../store/actions/tasks-actions";
import {Progress} from "../service-components/SnackBar/Progress";


export const Task: FC<TaskTypeProps> = memo(({data}) => {

    const {id, status, title, todoListId, entityStatus} = data
    const {dispatch} = useStore()
    const {initDevMode} = useDevMode()


    return (
        <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
        }} key={id}>

            <Checkbox
                onChange={(e) => {
                    initDevMode({
                        afterIsDevOff: () => dispatch(toggleTasks(todoListId, id, {

                            status: e.currentTarget.checked ? 2 : 1,
                            title,
                            priority: 1,
                            startDate: new Date().toDateString(),
                            description: 'task',
                            deadline: ''

                        })),
                        afterIsDevOn: () => dispatch(ToggleTaskAC(
                            id,
                            todoListId,
                            e.currentTarget.checked ? 2 : 1
                        ))
                    })
                }}
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
                    if (_title === title) {
                        return
                    }

                    initDevMode({
                        afterIsDevOff: () => dispatch(updateTasks(todoListID, id, _title, status)),
                        afterIsDevOn: () => dispatch(EditTaskAC(_title, status, id, todoListID))

                    })
                }}
            />

            <IconButton onClick={() => {
                initDevMode({
                    afterIsDevOff: () => dispatch(deleteTasks(todoListId, id)),
                    afterIsDevOn: () => dispatch(RemoveTaskAC(id,  todoListId))
                })
            }} aria-label="delete">
                <DeleteIcon/>
            </IconButton>


            <Portal>
                <Progress reason={entityStatus === 'loading'} />
            </Portal>

        </li>
    )

})