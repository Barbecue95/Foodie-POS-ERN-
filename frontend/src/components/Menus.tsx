import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface Menu {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
}

export function Menus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch("http://localhost:500/menus", {
      headers: {authorization: `Baerer ${token}`},
    });                           
    const menus = await response.json();
    setMenus(menus);
  };

  const handleClickNewMenu = () => {
    navigate("/new");
  };

  const handleDeleteMenu = async (menu: Menu) => {
    await fetch(`http://localhost:500/menus?id=${menu.id}`, { method: "DELETE" });
    getMenus();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        width: "100vw",
        height: "100vh",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 20 }}>
        <button style={{ cursor: "pointer" }} onClick={handleClickNewMenu}>
          Create New Menu
        </button>
      </div>
      <div style={{ display: "flex", margin: 30 ,flexWrap: "wrap" }}>
        {menus.map((menu) => (
          <div>
            <Link to={`${menu.id}`} style={{ textDecoration: "none" }}>
              <div
                key={menu.id}
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "5px 15px",
                  borderRadius: 10,
                  marginRight: 20,
                  width: 220,
                  cursor: "pointer",
                }}
              >
                <h3>{menu.name}</h3>
                <h5>{menu.price}</h5>
                <h5>{menu.isAvailable ? "Available" : "Not available"}</h5>
              </div>
            </Link>
            <button
              style={{
                borderRadius: 5,
                width: "fit-content",
                height: 30,
                marginTop: 10,
                cursor: "pointer",
                backgroundColor: "#00afb9",
                border: "none",
                color: "#fff",
              }}
              onClick={() => handleDeleteMenu(menu)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
