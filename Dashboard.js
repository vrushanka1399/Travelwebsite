import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

 const navigate = useNavigate();

 return (
  <div style={{ padding: 40 }}>

    <h1>Admin Dashboard</h1>

    <button onClick={()=>navigate("/bookings")}>
      View Bookings
    </button>
    <button onClick={()=>navigate("/listings")}>Manage Listings</button>
  </div>
 );
}
