import React,{useEffect,useState} from "react";
import { getBookings } from "../services/firebase";

export default function Bookings(){

 const [data,setData]=useState([]);

 useEffect(()=>{
   load();
 },[]);

 const load = async()=>{
   const res = await getBookings();

   const mapped = res.data.documents.map(doc=>({
     id: doc.name.split("/").pop(),
     ...Object.fromEntries(
       Object.entries(doc.fields).map(([k,v])=>[k,Object.values(v)[0]])
     )
   }));

   setData(mapped);
 };

 return(
  <div>
   <h2>All Bookings</h2>

   {data.map(b=>(
    <div key={b.id} style={{border:"1px solid"}}>
      <p>Email: {b.email}</p>
      <p>Total Guests: {b.guests}</p>
      <p>Check In: {b.checkIn}</p>
      <p>Check Out: {b.checkOut}</p>
    </div>
   ))}
  </div>
 );
}
