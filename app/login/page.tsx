"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";
import getUser from "../lib/getUser";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");
  const [uName, setUname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      if (userData !== "") {
        setUname(userData.username);
        setLoggedIn(true);
      }
      //console.log(uName);
    };

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      alert("Both fields required");
      return;
    }

    setLoading(true);

    Axios.post(
      "https://blogsserver.onrender.com/login",
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
        if (response.data === "Successfully Authenticated") {
          setLoggedIn(true);
          setUname(username);
        }

        if (response.data === "No User Exists or wrong credentials") {
          alert("No User Exists or wrong credentials!");
        }
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
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false after request completes
      });
  }

  return (
    <main className="text-black dark:text-white flex flex-col items-center justify-center main-height">
      <ParticlesBg />
      {loggedIn ? (
        <div className="mt-8 text-xl text-black dark:text-white">
          <p className="text-4xl">
            Logged in as <span className="text-[#F4BF96]">{uName}</span>
          </p>
          <br />
          <div className="opacity-70">
            <button
              className="text-red-600 font-bold"
              onClick={async () => {
                await Axios.post(
                  "https://blogsserver.onrender.com/logout",
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
          className="flex flex-col items-center border-4 rounded-xl border-black bg-[#CCC8AA] dark:bg-slate-800 bg-opacity-40 p-8 text-xl"
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

          {loading ? (
            // Loading circle
            <div className="mt-4 flex flex-col">
              <p className="text-green-700">Logging in...</p>
              <div className="mt-4 animate-spin rounded-full self-center h-12 w-12 border-b-4 border-gray-900"></div>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-4 font-extrabold text-blue-700"
            >
              Login
            </button>
          )}

          <br />
          <div>
            <p>Don&apos;t have an account?</p>
            <p>
              <span className="text-orange-500 font-bold">
                <a href="/register">Register</a>
              </span>{" "}
              here
            </p>
          </div>
        </form>
      )}
    </main>
  );
}
