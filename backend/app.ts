import cors from "cors";
import express from "express";
import { checkAuth } from "./checkAuth";
import authRouters from "./routers/authRouters";
import menuRouter from "./routers/menuRouter";
import menuCategoryRouter from "./routers/menucategoriesRouter";

const app = express();
const port = 500;

app.use(cors());
app.use(express.json());

app.use("/menus", checkAuth, menuRouter);
app.use("/menu-categories", checkAuth, menuCategoryRouter);
app.use("/auth", authRouters);

app.listen(port, () => console.log(`Server is listening on ${port}`));
