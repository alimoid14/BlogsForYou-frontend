"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

type blogType = {
  title: string;
  content: string;
  username: string;
  date: string;
};

async function getUser() {
  const userResponse = await Axios.get("http://localhost:3001/getUser", {
    responseType: "json",
    withCredentials: true,
  });
  console.log(userResponse.data);
  return userResponse.data; // Return user data, not the entire response
}

export default function RenderBlogs() {
  const [blogList, setBlogList] = useState([] as blogType[]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();

      if (userData !== "") setUserName(userData.username);
      Axios.get("http://localhost:3001/getBlogs")
        .then((response) => {
          setBlogList(response.data.reverse());
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <main className="flex justify-center min-height w-screen">
      <ParticlesBg />
      <div className="text-white w-2/3 mt-16 lg:w-[680px]">
        {userName !== "" ? (
          <div className="text-2xl text-[#F4BF96] mb-4 font-mono font-bold">
            Welcome {userName}!
          </div>
        ) : (
          <div className="text-2xl text-white text-opacity-50 w-2/3 mt-16 lg:w-[680px] mb-4">
            Do not have an account? <a href="login">Login here </a>or
            <a href="register"> create an account</a>!
          </div>
        )}

        {blogList?.map((blog, index) => (
          <div
            key={index}
            className="mb-16 border-2 border-white p-12 rounded-xl flex flex-col"
          >
            <div className="text-2xl font-semibold font-mono self-start flex w-[100%] justify-between">
              <h1>{blog.title}</h1>
              {blog.username === userName ? (
                <button className="text-[#F4BF96] font-bold opacity-70 text-xl">
                  &#8942;
                </button>
              ) : (
                <></>
              )}
            </div>

            <hr className="w-5/6 border-t-2 border-slate-600 " />
            <h1 className="text-[#F4BF96] font-mono text-[16px] md:text-xl self-end italic">
              ~by {blog.username}
            </h1>
            <br />
            <p className="text-xl font-light text-white text-[16px] md:text-xl">
              {blog.content}
            </p>
            <br />
            <p className="self-end text-xs text-white font-mono text-opacity-80">
              {blog.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
