"use client";
//import { format } from "path";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";
import getUser from "../lib/getUser";

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default function CreateBlog() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      if (userData !== "") setUserName(userData.username);
      console.log(userName);
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    username: "",
  });

  useEffect(() => {
    // Update the username property in the blog state when userName changes
    setBlog((prev) => ({ ...prev, username: userName }));
  }, [userName]);

  const handleChange = function (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    //console.log(e);
    const { name, value } = e.currentTarget;
    console.log(name);
    setBlog((prev) => ({ ...prev, [name]: value }));
    //console.log(blog);
    //console.log(e);
  };

  const handleSubmit = async function (e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (blog.title.trim() === "" || blog.content.trim() === "") {
      alert("Both the title and content are needed");
      return;
    }
    //setBlog((prev) => ({ ...prev, username: userName }));     >>>>>>>this had to be handled with useEffect()<<<<<<<

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    //const blogEntry = blog;
    await Axios.post(
      "https://blogsserver.onrender.com/Blogs",
      { ...blog, date: formattedDate },
      {
        withCredentials: true,
      },
    );
    //const blogText = blog;
    //console.log(blogText);

    setBlog({ title: "", content: "", username: userName });
    //console.log(blog);
  };

  return (
    <main className="main-height flex w-screen justify-center text-2xl">
      <ParticlesBg />
      {userName !== "" ? (
        <form
          className="mt-12 flex h-5/6 w-5/6 flex-col justify-center text-black dark:text-white md:w-[640px]"
          action=""
        >
          <input
            type="text"
            name="title"
            placeholder="Your title here"
            value={blog.title}
            required
            className="mt-auto bg-transparent p-4"
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Start here..."
            value={blog.content}
            required
            className="mt-4 h-5/6 w-full rounded-xl bg-transparent p-8 text-xl"
            onChange={handleChange}
          ></textarea>
          <button
            className="mt-12 self-end rounded-full bg-white px-2 text-black dark:bg-black dark:text-white"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </form>
      ) : (
        <div className="mt-16 w-2/3 text-2xl text-black dark:text-white lg:w-[680px]">
          To upload a blog please{" "}
          <a href="login" className="text-orange-500">
            login{" "}
          </a>
          or
          <a href="register" className="text-orange-500">
            {" "}
            create an account
          </a>
          !
        </div>
      )}
    </main>
  );
}
