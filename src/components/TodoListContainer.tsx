import {FC} from "react";
import {TodoList} from "./TodoList";
import {useStore} from "../hooks/useStore";

const TodoListContainer: FC = () => {
    const {useAppSelector} = useStore()

    const todos = useAppSelector(state => state.todos.todos)

    return (
        <>

            {todos.map((todo, i: number) => (


                <TodoList
                    key={todos[i].id}
                    todo={todo}
                />
            ))}

        </>
    )
}

export default TodoListContainer