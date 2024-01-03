"use client";
import ParticlesBg from "@/app/components/ParticlesBg";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import getUser from "@/app/lib/getUser";
import Blog from "@/app/components/Blog";

type Params = {
  params: {
    username: string;
  };
};

type blogType = {
  _id: string;
  title: string;
  content: string;
  username: string;
  date: string;
};

export default function UserPage({ params: { username } }: Params) {
  const [blogList, setBlogList] = useState([] as blogType[]);
  const [user, setUser] = useState(""); //user whose blogs are being fetched

  useEffect(() => {
    async function getUserName() {
      const userResponse = await Axios.post(
        "http://localhost:3001/getUserName",
        { username: username },
        {
          responseType: "json",
          //withCredentials: true,
        }
      );
      console.log(userResponse.data);
      return userResponse.data; // Return user data, not the entire response
    }
    const fetchData = async () => {
      const userData = await getUserName();
      if (userData !== "") setUser(userData.username);
      //console.log(userName);
      await Axios.get("http://localhost:3001/getBlogsByUser", {
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
    <main className="flex justify-center min-height w-screen">
      <ParticlesBg />
      <div className="text-black dark:text-white w-2/3 mt-16 lg:w-[680px]">
        {user !== "" ? (
          <div className="text-2xl md:text-4xl text-[#F4BF96] mb-4 font-mono font-bold">
            <span className="text-black dark:text-white">blogs by:</span> {user}
          </div>
        ) : (
          <div className="text-2xl text-black dark:text-white text-opacity-50 w-2/3 lg:w-[680px] mb-4">
            No user found
          </div>
        )}

        {blogList?.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </main>
  );
}
