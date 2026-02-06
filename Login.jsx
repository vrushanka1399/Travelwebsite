import React, { useState } from "react";
import { loginAdmin } from "../services/firebase";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin = async () => {
    const res = await loginAdmin(email,password);
    localStorage.setItem("token",res.data.idToken);
    window.location.href="/dashboard";
  };

  return (
    <div>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
