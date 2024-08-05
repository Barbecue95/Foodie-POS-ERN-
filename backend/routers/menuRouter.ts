import express from "express";
import fs from "fs";
import { Menu } from "../types";

const menuRouter = express.Router();

const getMenus = () => {
    const menusJsonStr = fs.readFileSync("menus.json", "utf-8");
    const menus = JSON.parse(menusJsonStr);
    return menus;
}

menuRouter.get("/", (req,res)=> {
    const exist = fs.existsSync("menus.json");
    if(!exist) return res.end(); 
    const menus = getMenus();
    res.send(menus);  
})

menuRouter.get("/:menuId", (req,res)=> {
    const {menuId} = req.params;
    const menus:Menu[] = getMenus();
    const menu = menus.find(menu=> menu.id === Number(menuId));
    res.send(menu);
})

menuRouter.post("/", (req,res)=> {
    const menu = req.body;
    const exist = fs.existsSync("menus.json");
    menu.id = 1;
    const menus = [menu]; 
      if (!exist) {
        fs.writeFileSync("menus.json", JSON.stringify(menus));
      } else {
        const menus = getMenus();
        menu.id = menus.length + 1;
        menus.push(menu);
        fs.writeFileSync("menus.json", JSON.stringify(menus));
      }
      res.end();
})

menuRouter.put("/", (req,res)=> {
    const Updatedmenu = req.body;
      let menus:Menu[] = JSON.parse(fs.readFileSync("menus.json", "utf-8"));
      menus = menus.map(menu=> menu.id === Updatedmenu.id ? Updatedmenu : menu );
      fs.writeFileSync("menus.json", JSON.stringify(menus));
      res.end();
})

menuRouter.delete("/", (req,res)=> {
    const query = req.query;
    const menuId = query.id;
    let menus:Menu[] = getMenus();
    menus = menus.filter(menu=> menu.id !== Number(menuId));
    fs.writeFileSync("menus.json", JSON.stringify(menus));
    res.end("Delete");
})

export default menuRouter;