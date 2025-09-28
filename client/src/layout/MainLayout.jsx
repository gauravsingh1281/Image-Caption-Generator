import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
    return (
        <>
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default MainLayout;