import {ChangeEvent, FC, memo, useState} from "react";
import Text from "../service-components/Text/Text";
import { TextField } from "@material-ui/core";

type EditableProps = {
    title: string,
    todoListID: string
    taskID: string
    editableType: 'p' | 'span' | 'h2' | 'h1'
    onSaveEdits: (title: string, todoListID: string, id: string) => void,

}

type EditStateType = {
    editMode: boolean,
    title: string
}

const Editable: FC<EditableProps> = memo(({title, onSaveEdits, todoListID, taskID, editableType}) => {
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

    return (
        state.editMode
            ?
                <TextField
                    autoFocus
                    onBlur={onBlurOffEditMode}
                    onChange={handleChangeTitle}
                    value={state.title} type="text"
                    label="Edit title"
                />




            : <Text type={editableType} onClickHandler={activateEditMode}>{state.title}</Text>
    )
})

export default Editable