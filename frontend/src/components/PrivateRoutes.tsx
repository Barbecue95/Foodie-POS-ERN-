import { Outlet } from "react-router-dom";
import { Login } from "./Login";

export function PrivateRoutes() {
    const token = localStorage.getItem("token");
    return <>{token ? <Outlet/> : <Login/>}</>
}