import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "./Menus";

export function NewMenu() {
  const defaultMenu = { id: 1, name: "", price: 0, isAvailable: false };
  const [menus, setMenus] = useState<Menu>(defaultMenu);
  const navigate = useNavigate();

  const handleClickMenu = async () => {
    const { name, price } = menus;
    const isValid = name.length > 0 && price >= 0;
    if (!isValid) alert("Enter your Name or Price can't be less than 0");
    //Send data to backend
    await fetch("http://localhost:500/menus", {
      method: "POST",
      headers : {"content-type" : "application/json"},
      body: JSON.stringify(menus),
    });
    setMenus(defaultMenu);
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#282c34",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            width: 200,
            padding:15,
            borderRadius: 10}}>
      <h1>New Menu</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setMenus({ ...menus, name: event.target.value });
        }}
      />
      <input
        type="number"
        style={{ margin: "10px 0" }}
        onChange={(event) => {
          setMenus({ ...menus, price: Number(event.target.value) });
        }}
        placeholder="Price"
      />
      <div>
        <input
          type="checkbox"
          style={{ marginRight: 10 }}
          onChange={(event) => {
            setMenus({ ...menus, isAvailable: event.target.checked });
          }}
        />
        <span>Available</span>
      </div>
      <button
        onClick={handleClickMenu}
        style={{ borderRadius: 5 ,width: "fit-content", height: 30 ,marginTop: 20, cursor:"pointer" , backgroundColor: "#00afb9", border: "none",color:"#fff"}}
      >
        Create
      </button>
      </div>
    </div>
  );
}
