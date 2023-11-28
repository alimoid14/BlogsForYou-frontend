"use client";
import React, { useState } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      alert("Both fields required");
      return;
    }

    Axios.post(
      "http://localhost:3001/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        // Handle successful login here
        console.log("No runtime error:", response.data);
        setUserName("");
        setPass("");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            // Unauthorized access, handle it appropriately (e.g., show an error message)
            alert("Unauthorized access. Please check your credentials.");
          } else {
            // Other status codes, handle accordingly
            console.error("Error response from server:", error.response.data);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
        }
      });
  }

  return (
    <main className="text-white flex items-center justify-center main-height">
      <ParticlesBg />
      <form
        id="loginForm"
        className="flex flex-col items-center border-4 rounded-xl border-white bg-black p-8"
      >
        <label htmlFor="username">Username:</label>
        <input
          type="email"
          id="username"
          name="username"
          required
          className="text-black"
          value={username}
          placeholder="Email"
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />

        <label htmlFor="password" className="mt-4">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="text-black"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPass(e.currentTarget.value);
          }}
        />

        <button onClick={handleSubmit} className="mt-4">
          Login
        </button>
      </form>
    </main>
  );
}
