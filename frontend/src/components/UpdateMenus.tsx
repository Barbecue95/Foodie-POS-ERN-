import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "./Menus";

export function UpdateMenu() {
    const [menu, setMenu] = useState<Menu>();
    const param = useParams();
    const naviagte = useNavigate();
    const menuId = param.menuId;

    useEffect(()=> {
        getMenuId()
    }, [])

    const getMenuId = async () => {
        const response = await fetch(`http://localhost:500/menus/${menuId}`);
        const menu = await response.json();
        setMenu(menu);
    }
    
    const handleUpdateMenu = async () => {
            await fetch("http://localhost:500/menus", {
            method: "PUT", 
            body: JSON.stringify(menu)
        })
        naviagte("/");
    }

    if(!menu) return null;

    return (
       <div style={{width:"100vw", height: "100vh", backgroundColor:"#282c34", display:"flex", alignItems:"center", justifyContent:"center"}}>
         <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            width: 220,
            padding: "30px 20px",
            borderRadius: 10
          }}
        >
          <h1>Update Menus</h1>
          <input
            type="text"
            value={menu.name}
            style={{ margin: "10px 0", width: 180 }}
            onChange={event=> setMenu({...menu, name:event.target.value})}
          />
          <input
            type="number"
            value={menu.price}
            style={{ margin: "10px 0", width: 180 }}
            onChange={event=> setMenu({...menu, price:Number(event.target.value)})}
          />
          <div>
            <input
              type="checkbox"
              checked={menu.isAvailable}
              style={{ marginRight: 10 }}
              onChange={event=> setMenu({...menu, isAvailable:event.target.checked})}
            />
            <span>Available</span>
          </div>
          <button
            style={{ borderRadius: 5 ,width: "fit-content", height: 30 ,marginTop: 20, cursor:"pointer" , backgroundColor: "#00afb9", border: "none",color:"#fff"}}
            onClick={handleUpdateMenu}
          >
            Update Menu
          </button>
        </div>
       </div>
    )
}