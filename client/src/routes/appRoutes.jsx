import Dashboard from "../pages/Dashboard/Dashboard";
import UploadImage from "../pages/Dashboard/UploadImage";
import ProtectedRoute from "./ProtectedRoute";

const appRoutes = [
    {
        path: "dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "uploadImage",
        element: (
            <ProtectedRoute>
                <UploadImage />
            </ProtectedRoute>
        ),
    },
]

export default appRoutes;