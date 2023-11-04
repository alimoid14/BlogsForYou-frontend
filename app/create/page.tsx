"use client";
import { format } from "path";
import React, { useState } from "react";

export default function CreateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  const handleChange = function (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    //console.log(e);
    const { name, value } = e.currentTarget;
    console.log(name);
    setBlog((prev) => ({ ...prev, [name]: value }));
    console.log(blog);
    //console.log(e);
  };
  const handleSubmit = function (e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const blogEntry = blog;

    //const blogText = blog;
    //console.log(blogText);

    setBlog((prev) => ({ title: "", content: "" }));
    console.log(blog);
  };
  return (
    <main className="main-height flex flex-col items-center text-2xl">
      <form
        className="h-5/6 w-5/6 flex flex-col mt-12 justify-center  text-white text-opacity-50"
        action=""
      >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Your title here"
          value={blog.title}
          required
          className="p-4 rounded-xl mt-auto bg-[rgb(12,53,106)]"
          onChange={handleChange}
        />
        <textarea
          id="content"
          name="content"
          placeholder="Start here..."
          value={blog.content}
          required
          className="bg-[#0C356A] mt-4 border-8  border-[#0C356A] w-full h-5/6 p-4 rounded-xl"
          onChange={handleChange}
        ></textarea>
        <button
          className="mt-4 self-end bg-[#0C356A] rounded-xl px-2 text-white"
          onSubmit={handleSubmit}
        >
          Upload
        </button>
      </form>
    </main>
  );
}
