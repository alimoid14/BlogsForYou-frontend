"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";
import getUser from "../lib/getUser";
import Image from "next/image";
import Blog from "../components/Blog";

type blogType = {
  _id: string;
  title: string;
  content: string;
  username: string;
  date: string;
};

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
  }, [blogList]); // Empty dependency array to fetch data only on mount

  return (
    <main className="flex flex-col justify-center min-height w-screen">
      <ParticlesBg />
      <Image
        src="/headerImage.jpg"
        width={500}
        height={500}
        alt="image"
        className="w-screen h-auto"
      />

      <div className="text-black dark:text-white w-2/3 mt-16 md:w-screen self-center">
        {userName !== "" ? (
          <div className="text-2xl text-[#F4BF96] mb-4 font-mono font-bold md:px-8">
            Welcome {userName}!
          </div>
        ) : (
          <div className="text-2xl text-black dark:text-white text-opacity-50 dark:text-opacity-50 mb-4 md:px-8">
            Do not have an account? <a href="login">Login here </a>or
            <a href="register"> create an account</a>!
          </div>
        )}

        <div className={`md:flex md:flex-wrap md:justify-evenly`}>
          {blogList?.map((blog) => (
            <div
              key={blog._id}
              className="md:w-2/5 h-[350px] overflow-y-scroll"
            >
              <Blog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
