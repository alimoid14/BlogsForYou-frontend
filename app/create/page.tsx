"use client";
//import { format } from "path";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

type blogType = {
  title: string;
  content: string;
};

async function getUser() {
  const userResponse = await Axios.get("http://localhost:3001/getUser", {
    responseType: "json",
    withCredentials: true,
  });
  console.log(userResponse.data);
  return userResponse.data; // Return user data, not the entire response
}

export default function CreateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      if (userData !== "") setUserName(userData.username);
      console.log(userName);
    };

    fetchData();
  }, [userName]); // Empty dependency array to fetch data only on mount

  const handleChange = function (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    //console.log(e);
    const { name, value } = e.currentTarget;
    console.log(name);
    setBlog((prev) => ({ ...prev, [name]: value }));
    //console.log(blog);
    //console.log(e);
  };

  const handleSubmit = function (e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (blog.title.trim() === "" || blog.content.trim() === "") {
      alert("Both the title and content are needed");
      return;
    }

    //const blogEntry = blog;
    Axios.post("http://localhost:3001/createBlog", blog, {
      withCredentials: true,
    });
    //const blogText = blog;
    //console.log(blogText);

    setBlog({ title: "", content: "" });
    //console.log(blog);
  };

  return (
    <main className="main-height flex justify-center w-screen text-2xl">
      <ParticlesBg />
      {userName !== "" ? (
        <form
          className="h-5/6 w-5/6 md:w-[640px] flex flex-col mt-12 justify-center  text-white text-opacity-50"
          action=""
        >
          <input
            type="text"
            name="title"
            placeholder="Your title here"
            value={blog.title}
            required
            className="p-4 mt-auto bg-transparent"
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Start here..."
            value={blog.content}
            required
            className="bg-transparent mt-4 text-xl w-full h-5/6 p-8 rounded-xl"
            onChange={handleChange}
          ></textarea>
          <button
            className="mt-12 self-end bg-slate-800 px-2 text-white rounded-full"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </form>
      ) : (
        <div className="text-2xl text-white text-opacity-50 w-2/3 mt-16 lg:w-[680px]">
          Please <a href="login">login </a>or
          <a href="register"> create an account</a>!
        </div>
      )}
    </main>
  );
}
