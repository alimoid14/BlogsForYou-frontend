"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

type blogType = {
  title: string;
  content: string;
  username: string;
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

      if (userData !== "") {
        setUserName(userData.username);
        Axios.get("http://localhost:3001/getBlogs", { withCredentials: true })
          .then((response) => {
            setBlogList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching blogs:", error);
          });
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <main className="flex justify-center min-height w-screen">
      <ParticlesBg />
      <div className="text-white w-2/3 mt-16 lg:w-[680px]">
        {blogList.length > 0 ? (
          <>
            <div className="text-2xl text-white text-opacity-50 mb-4 font-mono">
              Welcome {userName}!
            </div>

            {blogList?.map((blog, index) => (
              <div
                key={index}
                className="mb-16 border-2 border-white p-12 rounded-xl flex flex-col"
              >
                <h1 className="text-2xl font-semibold font-mono">
                  {blog.title}
                </h1>
                <hr className="w-5/6 border-t-2 border-slate-600 " />
                <h1 className="text-[#F4BF96] font-mono text-xl self-end italic">
                  ~by {blog.username}
                </h1>
                <p className="text-xl font-light">{blog.content}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="text-2xl text-white text-opacity-50">
            Please <a href="login">login </a>or
            <a href="register"> create an account</a>!
          </div>
        )}
      </div>
    </main>
  );
}
