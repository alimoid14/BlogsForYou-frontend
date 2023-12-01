"use client";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ParticlesBg from "../components/ParticlesBg";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");
  const [usernameCheck, setCheckData] = useState("");
  const [emailCheck, setEmailCheckData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await Axios.post("http://localhost:3001/checkUsername", {
        username: username,
      }).then((response) => setCheckData(response.data));
    };

    fetchData();
    return () => {
      setCheckData("");
    };
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      await Axios.post("http://localhost:3001/checkEmail", {
        email: email,
      }).then((response) => setEmailCheckData(response.data));
    };

    fetchData();
    return () => {
      setEmailCheckData("");
    };
  }, [email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      alert("All fields required");
      return;
    }

    await Axios.post("http://localhost:3001/register", {
      email,
      username,
      password,
    })
      .then((response) => {
        // Handle successful request here
        console.log("No runtime error:", response.data);
        setUserName("");
        setPass("");
        setEmail("");
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          required
          className="text-black"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <div className="text-red-500 font-bold font-mono">{emailCheck}</div>

        <label className="mt-4" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Username"
          required
          className="text-black"
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />
        <div className="text-red-500 font-bold font-mono">{usernameCheck}</div>

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

        {emailCheck === "" && usernameCheck === "" ? (
          <button className="mt-4" onClick={handleSubmit}>
            Register
          </button>
        ) : (
          <></>
        )}
      </form>
    </main>
  );
}
