import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      "https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings"
    );

    if (!res.data.documents) return;

    const arr = res.data.documents.map((d) => {
      const f = d.fields;

      return {
        id: d.name.split("/").pop(),
        hotel: f.hotel.stringValue,
        image: f.image.stringValue,
        city: f.city.stringValue,
        guests: f.guests.integerValue,
        checkIn: f.checkIn.stringValue,
        checkOut: f.checkOut.stringValue,
        email: f.email.stringValue,
        status: f.status?.stringValue || "Pending",
      };
    });

    setList(arr);
  };

  const updateStatus = async (id, status) => {
    await axios.patch(
      `https://firestore.googleapis.com/v1/projects/ecompract/databases/(default)/documents/bookings/${id}?updateMask.fieldPaths=status`,
      {
        fields: {
          status: { stringValue: status },
        },
      }
    );

    load();
  };

  return (
    <div className="grid">
      {list.map((b) => (
        <div className="card" key={b.id}>
          <img src={b.image} width="100%" />

          <h3>{b.hotel}</h3>

          <p>{b.email}</p>

          <p>Guests: {b.guests}</p>

          <p>
            {b.checkIn} → {b.checkOut}
          </p>

          <b>Status: {b.status}</b>

          <br />

          {b.status === "Pending" && (
            <>
              <button onClick={() => updateStatus(b.id, "Confirmed")}>
                Confirm
              </button>

              <button onClick={() => updateStatus(b.id, "Rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
