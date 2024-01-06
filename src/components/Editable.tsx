import {ChangeEvent, FC, memo, useState} from "react";
import Text from "../service-components/Text/Text";
import { TextField } from "@material-ui/core";
import {TaskStatuses} from "../api/todolist-tasks-api";

type EditableProps = {
    title: string,
    todoListID: string
    taskID: string
    status?: TaskStatuses
    editableType: 'p' | 'span' | 'h2' | 'h1'
    onSaveEdits: (_title: string, todoListID: string, id: string) => void,

}

type EditStateType = {
    editMode: boolean,
    title: string
}

const Editable: FC<EditableProps> = memo(({title, status, onSaveEdits, todoListID, taskID, editableType}) => {
    const [state, setState] = useState<EditStateType>({
        editMode: false,
        title: title
    })

    const activateEditMode = () => {
        setState({
            ...state,
            editMode: true
        })
    }

    const onBlurOffEditMode = () => {
        if(!state.title.length){
            return
        }

        setState({
            ...state,
            editMode: false
        })

        onSaveEdits(state.title, todoListID, taskID)

    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            title: e.currentTarget.value
        })
    }

    const evalNotification = () => {
        if(!state.title.length){
            return 'Empty Values!'
        }

    
    }
    return (
        state.editMode ?
                <TextField
                    autoFocus
                    onBlur={onBlurOffEditMode}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                            onBlurOffEditMode()
                        }
                    }}
                    onChange={handleChangeTitle}
                    value={state.title} type="text"
                    color={!state.title || state.title.length >= 100 ? 'secondary' : 'primary'}
                    label={evalNotification()}
                />


            : <Text txtdecor={status === 2 ? 'line-through' : 'none'} type={editableType} onClickHandler={activateEditMode}>{state.title}</Text>
    )
})

export default Editable