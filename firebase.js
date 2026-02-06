import axios from "axios";

const API_KEY = "AIzaSyDks0TAzbSkH_kzGrqdHQR1cxa_v-Yy0Gs";
const PROJECT_ID = "ecompract";

export const loginAdmin = (email, password) => {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );
};

export const getBookings = () => {
  return axios.get(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/bookings`
  );
};
/* CREATE LISTING */
export const addListing = (data)=>{
 return axios.post(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/listings`,
  {
   fields:{
    name:{stringValue:data.name},
    price:{integerValue:data.price},
    address:{stringValue:data.address},
    city:{stringValue:data.city},
    pincode:{stringValue:data.pincode},
    image:{stringValue:data.image}
   }
  }
 );
};

/* GET LISTINGS */
export const getListings = ()=>{
 return axios.get(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/listings`
 );
};

/* DELETE LISTING */
export const deleteListing = (id)=>{
 return axios.delete(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/listings/${id}`
 );
};

/* UPDATE LISTING */
export const updateListing = (id,data)=>{
 return axios.patch(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/listings/${id}`,
  {
   fields:{
    name:{stringValue:data.name},
    price:{integerValue:data.price},
    address:{stringValue:data.address},
    city:{stringValue:data.city},
    pincode:{stringValue:data.pincode},
    image:{stringValue:data.image}
   }
  }
 );
};
