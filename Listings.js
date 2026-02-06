import React,{useEffect,useState} from "react";
import { addListing,getListings,deleteListing,updateListing } from "../services/firebase";

export default function Listings(){

 const empty={
  name:"",
  price:"",
  address:"",
  city:"",
  pincode:"",
  image:""
 };

 const [form,setForm]=useState(empty);
 const [listings,setListings]=useState([]);
 const [editId,setEditId]=useState(null);

 useEffect(()=>{ load(); },[]);

 const load = async()=>{
  const res = await getListings();
  if(!res.data.documents) return;

  const mapped=res.data.documents.map(doc=>{
   const f=doc.fields;
   return{
    id:doc.name.split("/").pop(),
    name:f.name.stringValue,
    price:f.price.integerValue,
    address:f.address.stringValue,
    city:f.city.stringValue,
    pincode:f.pincode.stringValue,
    image:f.image.stringValue
   };
  });

  setListings(mapped);
 };

 const submit = async()=>{
  if(editId){
   await updateListing(editId,form);
   setEditId(null);
  }else{
   await addListing(form);
  }

  setForm(empty);
  load();
 };

 const edit=(l)=>{
  setEditId(l.id);
  setForm(l);
 };

 const remove=async(id)=>{
  await deleteListing(id);
  load();
 };

 return(
  <div style={{padding:40}}>

   <h2>{editId?"Edit Hotel":"Add Hotel Listing"}</h2>

   <input placeholder="Hotel Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><br/>
   <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/><br/>
   <input placeholder="Pincode" value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})}/><br/>
   <input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/><br/>
   <input placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><br/>
   <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/><br/>

   <button onClick={submit}>
    {editId?"Update":"Add"}
   </button>

   <hr/>

   <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
    {listings.map(l=>(
     <div key={l.id} style={{background:"#fff",padding:20}}>

      <img src={l.image} width="100%" />

      <h4>{l.name}</h4>
      <p>Price: {l.price}</p>
      <p>Address: {l.address}</p>
      <p>Pincode: {l.pincode}</p>
      <p>City: {l.city}</p>

      <button onClick={()=>edit(l)}>Edit</button>
      <button onClick={()=>remove(l.id)}>Delete</button>

     </div>
    ))}
   </div>

  </div>
 );
}
