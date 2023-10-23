import React from "react"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    let auth = localStorage.getItem("uid")
    return (auth ? <Outlet /> : <Navigate to="/" />
    );
}

export default PrivateRoute