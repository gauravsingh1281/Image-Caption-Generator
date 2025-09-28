import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>Dashboard</div>
            <button onClick={() => navigate("/uploadImage")}>Upload Image</button>
        </>
    )
}

export default Dashboard;