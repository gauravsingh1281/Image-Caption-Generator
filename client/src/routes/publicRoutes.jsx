import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";

const publicRoutes = [
    { index: true, element: <Home /> },
    { path: "*", element: <NotFoundPage /> }
]

export default publicRoutes;