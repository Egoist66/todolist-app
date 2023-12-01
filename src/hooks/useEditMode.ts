import { useCallback, useState } from "react"

export const useEditMode = () => {
     const [isEditMode, setEditMode] = useState<boolean>(false)

     const activateEditMode = useCallback(() => {
         
         setEditMode(isEditMode => !isEditMode)
 
     }, [isEditMode])
 
     const onBlurOffEditMode = useCallback(() => {
         setEditMode(false)
 
     }, [isEditMode])

     return {
          activateEditMode,
          isEditMode,
          onBlurOffEditMode
     }
}