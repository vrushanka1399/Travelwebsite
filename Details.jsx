import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  const [hotel, setHotel] = useState({});
  const [guests, setGuests] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      `https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/listings/${id}`
    );

    const f = res.data.fields;

    setHotel({
      name: f.name.stringValue,
      price: f.price.integerValue,
      address: f.address.stringValue,
      pincode: f.pincode.stringValue,
      city: f.city.stringValue,
      image: f.image.stringValue,
    });
  };

  const book = async () => {
    const email = localStorage.getItem("user");

    await axios.post(
      "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings",
      {
        fields: {
          hotel: { stringValue: hotel.name },
          price: { integerValue: hotel.price },
          address: { stringValue: hotel.address },
          pincode: { stringValue: hotel.pincode },
          city: { stringValue: hotel.city },
          image: { stringValue: hotel.image },
          guests: { integerValue: guests },
          checkIn: { stringValue: checkIn },
          checkOut: { stringValue: checkOut },
          email: { stringValue: email },
          status: { stringValue: "Pending" },
        },
      }
    );

    alert("Booked!");
  };

  return (
    <div className="details">
      <img src={hotel.image} width="100%" alt="" />

      <h2>{hotel.name}</h2>
      <p>₹{hotel.price}/night</p>
      <p>{hotel.address}</p>
      <p>{hotel.city}</p>

      <input placeholder="Guests" onChange={(e) => setGuests(e.target.value)} />
      <input type="date" onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} />

      <button onClick={book}>Book Now</button>
    </div>
  );
}
