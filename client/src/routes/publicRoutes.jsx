import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const publicRoutes = [
    { index: true, element: <Home /> },
    { path: "*", element: <NotFound /> }
]

export default publicRoutes;