import React, { useState } from "react";
import { signupUser, loginUser } from "../services/firebase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await signupUser(email, password);
      alert("Signup successful. Now login.");
    } catch (err) {
      alert(err.response?.data?.error?.message || "Signup failed");
    }
  };

  const login = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await loginUser(email, password);

      // store logged in user
      localStorage.setItem("user", JSON.stringify({ email }));


      // redirect to home
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.error?.message || "Login failed");
    }
  };

  return (
    <div style={{ marginTop: 150, textAlign: "center" }}>
      <h2>User Auth</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button onClick={signup}>Signup</button>
      &nbsp;&nbsp;
      <button onClick={login}>Login</button>
    </div>
  );
}
