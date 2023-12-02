"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ParticlesBg from "../components/ParticlesBg";

type blogType = {
  _id: string;
  title: string;
  content: string;
  username: string;
  date: string;
};

async function getUser() {
  const userResponse = await Axios.get("http://localhost:3001/getUser", {
    responseType: "json",
    withCredentials: true,
  });
  console.log(userResponse.data);
  return userResponse.data; // Return user data, not the entire response
}

export default function RenderBlogs() {
  const [blogList, setBlogList] = useState([] as blogType[]);
  const [userName, setUserName] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [blogID, setBlogID] = useState("");

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
    <main className="flex justify-center min-height w-screen">
      <ParticlesBg />
      <div className="text-white w-2/3 mt-16 lg:w-[680px]">
        {userName !== "" ? (
          <div className="text-2xl text-[#F4BF96] mb-4 font-mono font-bold">
            Welcome {userName}!
          </div>
        ) : (
          <div className="text-2xl text-white text-opacity-50 w-2/3 lg:w-[680px] mb-4">
            Do not have an account? <a href="login">Login here </a>or
            <a href="register"> create an account</a>!
          </div>
        )}

        {blogList?.map((blog, index) => (
          <div
            key={blog._id}
            className="mb-16 border-2 border-white p-12 rounded-xl flex flex-col"
          >
            <div className="text-2xl font-semibold font-mono self-start flex w-[100%] justify-between">
              <h1>{blog.title}</h1>
              {blog.username === userName ? (
                <div className="right-0">
                  <button
                    className="text-[#F4BF96] font-bold opacity-70 text-xl right-0"
                    onClick={(e) => {
                      console.log(blog._id);
                      setConfirming((prev) => !prev);
                      setBlogID(blog._id);
                      //else setBlogID("");
                    }}
                  >
                    {confirming && blogID === blog._id ? <>❌</> : <>Delete</>}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            {confirming && blogID === blog._id ? (
              <div className="self-end flex flex-col font-mono bg-[#CCC8AA] bg-opacity-40 p-4 my-4">
                <p>
                  Are you sure you want to delete this blog? You won&apos;t be
                  able to retrieve it again.
                </p>
                <div className="flex flex-row justify-evenly font-bold mt-4">
                  <button
                    className="text-red-500"
                    onClick={async () => {
                      blogList.filter((blog) => blog._id !== blogID);
                      await Axios.post(
                        "http://localhost:3001/deleteBlog",
                        { _id: blog._id },
                        { withCredentials: true }
                      );
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setConfirming(false);
                      //setBlogID("");
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <hr className="w-5/6 border-t-2 border-slate-600 " />
            <h1 className="text-[#F4BF96] font-mono text-[16px] md:text-xl self-end italic">
              ~by {blog.username}
            </h1>
            <br />
            <p className="text-xl font-light text-white text-[16px] md:text-xl">
              {blog.content}
            </p>
            <br />
            <p className="self-end text-xs text-white font-mono text-opacity-80">
              {blog.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
