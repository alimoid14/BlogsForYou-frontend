"use client";
import Axios from "axios";
import React, { useState } from "react";
import ParticlesBg from "../components/ParticlesBg";

export default function RegistrationPage() {
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      alert("Both fields required");
      return;
    }

    await Axios.post("http://localhost:3001/register", {
      username,
      password,
    })
      .then((response) => {
        // Handle successful request here
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
        id="registrationForm"
        className="flex flex-col items-center border-4 border-black rounded-xl bg-[#CCC8AA] bg-opacity-40 p-8"
      >
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={username}
          placeholder="Email"
          required
          className="text-black"
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />

        <label className="mt-4" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Password"
          required
          className="text-black"
          onChange={(e) => {
            setPass(e.currentTarget.value);
          }}
        />

        <button className="mt-4" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </main>
  );
}
