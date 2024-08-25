import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const auth = localStorage.getItem("uid");
    return auth ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoute