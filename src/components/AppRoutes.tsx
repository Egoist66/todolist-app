import {FC, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Text from "../service-components/Text/Text";
import {Spinner} from "../service-components/spinner/Spinner";

const TodoList = lazy(() => import('./TodoListContainer'))
const Login = lazy(() => import('./Login'))

export const AppRoutes: FC = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path={'/login'} element={<Login />} />
                <Route index element={<TodoList />} />
            </Routes>
        </Suspense>
    )
}