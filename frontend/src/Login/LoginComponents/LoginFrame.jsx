import { Outlet } from "react-router-dom";


const LoginFrame = () => {
    return (
        <div>
            <h1>LoginFrame</h1>
            <Outlet />
        </div>
    );
};

export default LoginFrame;