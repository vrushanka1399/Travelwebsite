import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
 const navigate = useNavigate();

 const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
 };

 return (
  <div style={{ padding: 40 }}>

    <div style={{display:"flex",justifyContent:"space-between"}}>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>

    <br/>

    <button onClick={()=>navigate("/bookings")}>Bookings</button>
    <button onClick={()=>navigate("/listings")}>Manage Listings</button>

  </div>
 );
}
