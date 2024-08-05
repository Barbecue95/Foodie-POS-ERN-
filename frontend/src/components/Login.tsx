import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string,
  password: string
}

export function Login() {
    const defaultUser = {email: "", password: ""};
    const [user, setUser] = useState<User>(defaultUser);
    const naviagte = useNavigate();
    
    const handleLogin = async () => {
      const {email,password} = user;
      const isValid = email.length !== 0 && password.length !== 0;
      if(!isValid) return alert("Are you freaking stupid!!!");
      const response = await fetch("http://localhost:500/auth/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(user),
      })

      const dataFromServer = await response.json();
      const {token} = dataFromServer;
      localStorage.setItem("token", token);
      naviagte('/');
    }

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
          <h1>Login</h1>
          <input
            type="text"
            value={user.email}
            placeholder="Enter Your Email"
            style={{ margin: "10px 0", width: 180 }}
            onChange={event=> setUser({...user, email:event.target.value})}
          />
          <input
            type="password"
            value={user.password}
            placeholder="Enter Your Password"
            style={{ margin: "10px 0", width: 180 }}
            onChange={event=> setUser({...user, password:event.target.value})}
          />
          <button
            style={{ borderRadius: 5 ,width: "fit-content", height: 30 ,marginTop: 20, cursor:"pointer" , backgroundColor: "#00afb9", border: "none",color:"#fff"}}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
       </div>
    )
}