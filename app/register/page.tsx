"use client";
import Axios from "axios";
import React, { useState } from "react";
import ParticlesBg from "../components/ParticlesBg";

export default function RegistrationPage() {
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");

  async function handleSubmit() {
    if (username.trim() === "" || password.trim() === "") {
      alert("Both fields required");
      return;
    }

    await Axios.post("http://localhost:3001/register", {
      username,
      password,
    });

    setUserName("");
    setPass("");
  }

  return (
    <main className="text-white flex items-center justify-center main-height">
      <ParticlesBg />
      <form
        id="registrationForm"
        className="flex flex-col items-center border-4 border-white rounded-xl bg-black p-8"
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
