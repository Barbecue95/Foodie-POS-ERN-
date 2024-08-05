import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Menus } from "./Menus";
import { NewMenu } from "./NewMenu";
import { PrivateRoutes } from "./PrivateRoutes";
import { Register } from "./Register";
import { UpdateMenu } from "./UpdateMenus";

export function AppRouter() {
    return (
    <BrowserRouter>
    <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Menus/>} />
            <Route path="/new" element={<NewMenu />} />
            <Route path="/:menuId" element={<UpdateMenu />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
)}