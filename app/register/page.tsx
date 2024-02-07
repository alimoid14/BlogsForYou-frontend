"use client";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ParticlesBg from "../components/ParticlesBg";
import getUser from "../lib/getUser";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [usernameCheck, setCheckData] = useState("");
  const [emailCheck, setEmailCheckData] = useState("");
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
  }, [uName]);

  useEffect(() => {
    const fetchData = async () => {
      await Axios.post("https://blogsserver.onrender.com/checkUsername", {
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
      await Axios.post("https://blogsserver.onrender.com/checkEmail", {
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

    if (password !== passCheck) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    await Axios.post("https://blogsserver.onrender.com/register", {
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
        setPassCheck("");
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
    <main className="text-black dark:text-white flex items-center justify-center main-height">
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
            <span> first to register a new account</span>
          </div>
        </div>
      ) : (
        <form
          id="registrationForm"
          className="flex flex-col items-center border-4 border-black rounded-xl bg-[#CCC8AA] dark:bg-slate-800 bg-opacity-40 p-8 text-xl"
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
            maxLength={10}
            onChange={(e) => {
              const input = e.currentTarget.value;

              // Validate input using a regular expression
              const validInput = input.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters

              // Update the username state with the validated input
              setUserName(validInput.slice(0, 10));
            }}
          />
          <div className="text-red-500 font-bold font-mono">
            {usernameCheck}
          </div>

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

          <label className="mt-4" htmlFor="passCheck">
            Re-Enter Password:
          </label>
          <input
            type="password"
            id="passCheck"
            name="passCheck"
            value={passCheck}
            placeholder="Password"
            required
            className="text-black"
            onChange={(e) => {
              setPassCheck(e.currentTarget.value);
            }}
          />

          {emailCheck === "" && usernameCheck === "" ? (
            loading ? (
              // Loading circle
              <div className="mt-4 flex flex-col">
                <p className="text-green-700">Registering the user...</p>
                <div className="mt-4 animate-spin rounded-full self-center h-12 w-12 border-b-4 border-gray-900"></div>
              </div>
            ) : (
              // Register button
              <button
                className="mt-4 font-extrabold text-blue-700"
                onClick={handleSubmit}
              >
                Register
              </button>
            )
          ) : (
            <></>
          )}

          <br />
          <div>
            <p>Already have an account?</p>
            <p>
              <span className="text-orange-500 font-bold">
                <a href="/login">Login</a>
              </span>{" "}
              here
            </p>
          </div>
        </form>
      )}
    </main>
  );
}
