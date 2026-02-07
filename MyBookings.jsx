import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
 const [list, setList] = useState([]);

 useEffect(() => {
  load();
 }, []);

 const load = async () => {
  const res = await axios.get(
   "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings"
  );

  console.log("RAW FIRESTORE:", res.data);

  if (!res.data.documents) {
   setList([]);
   return;
  }

  const arr = res.data.documents.map(d => {
   const f = d.fields || {};

   return {
    id: d.name.split("/").pop(),

    hotel: f.hotel?.stringValue || "",
    image: f.image?.stringValue || "",
    guests: f.guests?.integerValue || "",
    checkIn: f.checkIn?.stringValue || "",
    checkOut: f.checkOut?.stringValue || "",
    status: f.status?.stringValue || "Pending",
    email: f.email?.stringValue || ""
   };
  });

  console.log("ALL BOOKINGS:", arr);

  // TEMP: show everything (no filter)
  setList(arr);
 };

 return (
  <div>
   {list.map(b => (
    <div key={b.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
     {b.image && <img src={b.image} width="200" alt="" />}

     <h3>{b.hotel}</h3>
     <p>Guests: {b.guests}</p>
     <p>{b.checkIn} → {b.checkOut}</p>
     <b>Status: {b.status}</b>
    </div>
   ))}
  </div>
 );
}
