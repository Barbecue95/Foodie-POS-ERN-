import fs from "fs";
import http from "http";
import { URL } from "url";

interface Menu {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","*");
  const { url, method } = req;
  if (method === "GET"){
    if(url === "/") {
      const exist = fs.existsSync("menus.json");
      if(!exist) return res.end("[]"); 
      const menusJsonStr = fs.readFileSync("menus.json", "utf-8");
      const menus = JSON.parse(menusJsonStr);
      res.end(JSON.stringify(menus));
    } else {
      const newURL = new URL(url, `http://${req.headers.host}`);
      const menuId = Number(newURL.searchParams.get("menuId"));
      const menus = JSON.parse(fs.readFileSync("menus.json", "utf-8"));
      const menu = menus.find(menu=> menu.id === menuId);
      res.end(JSON.stringify(menu));
    }
  }
  else if (method === "POST") {
    let body = "";
    req.on("data", (chunck) => {
      body += chunck;
    })
    req.on("end", () => {
      const menu = JSON.parse(body);
      menu.id = 1;
      const menus = [menu]; 
      const exist = fs.existsSync("menus.json");
      if (!exist) {
        fs.writeFileSync("menus.json", JSON.stringify(menus));
      } else {
        const menusJsonStr = fs.readFileSync("menus.json", "utf-8");
        const menus:Menu[] = JSON.parse(menusJsonStr);
        menu.id = menus.length + 1;
        menus.push(menu);
        fs.writeFileSync("menus.json", JSON.stringify(menus));
      }
      res.end();
    });
  } else if (method === "PUT"){
    let body = "";
    req.on("data", (chunck) => {
      body += chunck;
    })
    req.on("end", () => {
      const Updatedmenu = JSON.parse(body);
      let menus:Menu[] = JSON.parse(fs.readFileSync("menus.json", "utf-8"));
      menus = menus.map(menu=> menu.id === Updatedmenu.id ? Updatedmenu : menu );
      fs.writeFileSync("menus.json", JSON.stringify(menus));
      res.end();
  })
  } else if (method === "DELETE") {
    const newURL = new URL(url, `http://${req.headers.host}`);
      const menuId = Number(newURL.searchParams.get("menuId"));
      let menus = JSON.parse(fs.readFileSync("menus.json", "utf-8"));
      menus = menus.filter(menu=> menu.id !== menuId);
      fs.writeFileSync("menus.json", JSON.stringify(menus));
      res.end();
  } else {
    res.end()
  }
});

const Port = 500;
server.listen(Port, () => {
  console.log(`Server started listening on port: ${Port}`);
});
