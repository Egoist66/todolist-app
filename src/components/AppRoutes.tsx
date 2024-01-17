import {FC, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Text from "../service-components/Text/Text";
import {Spinner} from "../service-components/Spinner/Spinner";
import {Progress} from "../service-components/SnackBar/Progress";

const TodoList = lazy(() => import('./TodoListContainer'))
const Login = lazy(() => import('./Login'))

export const AppRoutes: FC = () => {
    return (
        <Suspense fallback={<Progress reason={true}/>}>
            <Routes>
                <Route path={'/login'} element={<Login />} />
                <Route index element={<TodoList />} />
                <Route path="*" element={<h2>404 - Not found</h2>} />
            </Routes>
        </Suspense>
    )
}