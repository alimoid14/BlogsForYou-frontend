"use client";
import ParticlesBg from "@/app/components/ParticlesBg";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Blog from "@/app/components/Blog";
import blogType from "@/app/lib/blogType";

type Params = {
  params: {
    username: string;
  };
};

export default function UserPage({ params: { username } }: Params) {
  const [blogList, setBlogList] = useState([] as blogType[]);
  const [user, setUser] = useState(""); //user whose blogs are being fetched

  useEffect(() => {
    async function getUserName() {
      const userResponse = await Axios.get(
        "https://blogsserver.onrender.com/UserName",
        {
          params: { username: username },
        },
      );
      //console.log(userResponse.data);
      return userResponse.data; // Return user data, not the entire response
    }
    const fetchData = async () => {
      const userData = await getUserName();
      if (userData !== "") setUser(userData.username);
      //console.log(userName);
      await Axios.get("https://blogsserver.onrender.com/BlogsByUser", {
        params: { username: username },
      })
        .then((response) => {
          setBlogList(response.data.reverse());
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    };

    fetchData();
  }, [blogList, username]); // Empty dependency array to fetch data only on mount

  return (
    <main className="min-height flex w-screen justify-center">
      <ParticlesBg />
      <div className="mt-16 w-5/6 text-black dark:text-white">
        {user !== "" ? (
          <div className="mb-4 font-mono text-2xl font-bold text-[#F4BF96] md:text-4xl">
            <span className="text-black dark:text-white">blogs by:</span> {user}
          </div>
        ) : (
          <div className="mb-4 w-2/3 text-2xl text-black text-opacity-50 dark:text-white lg:w-[680px]">
            No user found
          </div>
        )}

        {blogList?.map((blog) => <Blog key={blog._id} blog={blog} />)}
      </div>
    </main>
  );
}
