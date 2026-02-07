import React,{useState} from "react";
import { loginAdmin, signupAdmin, saveAdmin, checkAdmin } from "../services/firebase";

export default function Login(){

 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");

 const signup = async()=>{
  try{
   await signupAdmin(email,password);
   await saveAdmin(email);
   alert("Admin Registered Successfully");
  }catch(err){
   alert(err.response?.data?.error?.message || "Signup Failed");
  }
 };

 const login = async()=>{
  try{
   const res = await loginAdmin(email,password);

   const admins = await checkAdmin();

   if(!admins.data.documents){
    alert("No admins registered yet. Please signup first.");
    return;
   }

   const allowed = admins.data.documents.some(
    d=>d.fields.email.stringValue===email
   );

   if(!allowed){
    alert("You are not authorized");
    return;
   }

   localStorage.setItem("token",res.data.idToken);
   window.location.href="/dashboard";

  }catch(err){
   alert(err.response?.data?.error?.message || "Login Failed");
  }
 };

 return(
  <div style={{display:"flex",justifyContent:"center",marginTop:150}}>
   <div>

    <h2>Admin Auth</h2>
    <div className="auth-box">
    <input
     placeholder="email"
     value={email}
     onChange={e=>setEmail(e.target.value)}
    /><br/>

    <input
     placeholder="password"
     type="password"
     value={password}
     onChange={e=>setPassword(e.target.value)}
    /><br/>
    </div>

    <button onClick={signup}>Sign Up</button><br/>
    <button onClick={login}>Login</button>

   </div>
  </div>
 );
}
