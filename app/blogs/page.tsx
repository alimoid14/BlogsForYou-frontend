"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";
import getUser from "../lib/getUser";
import Image from "next/image";
import Blog from "../components/Blog";
import blogType from "../lib/blogType";

export default function RenderBlogs() {
  const [blogList, setBlogList] = useState([] as blogType[]);
  const [userName, setUserName] = useState(""); //the logged in user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();

      if (userData !== "") setUserName(userData.username);
      try {
        const response = await Axios.get(
          "https://blogsserver.onrender.com/Blogs",
        );
        setBlogList(response.data.reverse());
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogList]);

  return (
    <main className="min-height flex w-screen flex-col items-center justify-center">
      <ParticlesBg />
      <Image
        src="/myBlogBanner.png"
        width={500}
        height={500}
        quality={100}
        alt="image"
        className="mt-0 h-auto w-screen"
        unoptimized={true}
        priority
      />

      <div className="mb-auto mt-16 w-5/6 self-center text-black dark:text-white md:w-screen">
        {userName !== "" ? (
          <div className="mb-4 font-mono text-2xl font-bold text-[#F4BF96] md:px-8">
            Welcome {userName}!
          </div>
        ) : (
          <div className="mb-4 text-2xl text-black text-opacity-50 dark:text-white dark:text-opacity-50 md:px-8">
            Do not have an account? <a href="login">Login here </a>or
            <a href="register"> create an account</a>!
          </div>
        )}

        <div className={`md:flex md:flex-wrap md:justify-evenly`}>
          {loading ? (
            <div className="my-auto text-center text-xl opacity-70">
              Loading blogs...
            </div>
          ) : (
            blogList.map((blog) => (
              <div
                key={blog._id}
                className=" mb-12 h-auto overflow-y-hidden border-2 border-[#CCC8AA] bg-[#CCC8AA] bg-opacity-40 dark:border-[#161616] dark:bg-[#161616] dark:bg-opacity-40 md:w-2/5 md:p-2"
              >
                <Blog blog={blog} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
