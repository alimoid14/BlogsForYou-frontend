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
    Axios.get("http://localhost:3001/getBlogs").then((response) => {
      console.log(response.data);
      setBlogList(response.data);
    });
  }, []);

  return (
    <div className="text-white">
      {blogList.map((blog, index) => (
        <div key={index}>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
