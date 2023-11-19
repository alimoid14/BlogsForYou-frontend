"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

type blogType = {
  title: string;
  content: string;
};

export default function RenderBlogs() {
  const [blogList, setBlogList] = useState([] as blogType[]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getBlogs")
      .then((response) => {
        //console.log(response.data);

        setBlogList(response.data);
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <main className="flex justify-center min-height w-screen">
      <ParticlesBg />
      <div className="text-white w-2/3 mt-16 lg:w-[680px]">
        {blogList?.map((blog, index) => (
          <div key={index} className="mb-16 bg-slate-700 p-12">
            <h1 className="text-2xl">{blog.title}</h1>
            <br />
            <hr className="w-2/3 border-t-2 border-slate-600 " />
            <br />
            <p className="text-xl">{blog.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
