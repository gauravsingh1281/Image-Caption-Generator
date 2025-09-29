import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import publicRoutes from "./publicRoutes";
import authRoutes from "./authRoutes";
import appRoutes from "./appRoutes";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            ...appRoutes,
            ...publicRoutes,
            ...authRoutes,

        ],
    }
]);

export default router;