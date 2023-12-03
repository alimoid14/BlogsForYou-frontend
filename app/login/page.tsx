"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

async function getUser() {
  const userResponse = await Axios.get("http://localhost:3001/getUser", {
    responseType: "json",
    withCredentials: true,
  });
  console.log(userResponse.data);
  return userResponse.data; // Return user data, not the entire response
}

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");
  const [uName, setUname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      if (userData !== "") {
        setUname(userData.username);
        setLoggedIn(true);
      }
      console.log(uName);
    };

    fetchData();
  });

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
    <main className="text-white flex flex-col items-center justify-center main-height">
      <ParticlesBg />
      {loggedIn ? (
        <div className="mt-8 text-xl text-white">
          <p className="text-4xl">
            Logged in as <span className="text-[#F4BF96]">{uName}</span>
          </p>
          <br />
          <div className="opacity-70">
            <button
              onClick={async () => {
                await Axios.post(
                  "http://localhost:3001/logout",
                  {},
                  {
                    withCredentials: true,
                  }
                );
                setUname("");
                setLoggedIn(false);
              }}
            >
              Logout
            </button>
            <span> first to login with a different account</span>
          </div>
        </div>
      ) : (
        <form
          id="loginForm"
          className="flex flex-col items-center border-4 rounded-xl border-black bg-[#CCC8AA] bg-opacity-40 p-8"
        >
          <label htmlFor="username">Username or Email:</label>
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
      )}
    </main>
  );
}
