"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";

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
    <main className="flex justify-center main-height w-screen">
      <div className="text-white w-2/3 lg:w-[680px]">
        {blogList?.map((blog, index) => (
          <div key={index} className="mt-16 bg-[rgb(12,53,106)] p-12">
            <h1 className="text-2xl">{blog.title}</h1>
            <br />
            <hr className="w-2/3" />
            <br />
            <p className="text-xl">{blog.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
