import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import publicRoutes from "./PublicRoutes";
import authRoutes from "./AuthRoutes";
import appRoutes from "./AppRoutes";
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