"use client";
import ParticlesBg from "@/app/components/ParticlesBg";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import getUser from "@/app/lib/getUser";

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
  const [userName, setUserName] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);
  const [blogID, setBlogID] = useState("");
  const [tempContent, setContent] = useState("");
  const [toggleButtons, setToggle] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      if (userData !== "") setUserName(userData.username);
      console.log(userName);
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  useEffect(() => {
    setContent("");
  }, [blogID]);

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

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserName();
      if (userData !== "") setUser(userData.username);
      console.log(userName);
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
  }, []); // Empty dependency array to fetch data only on mount

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

        {blogList?.map((blog, index) => (
          <div
            key={blog._id}
            className="mb-16 border-2 border-white p-12 rounded-xl flex flex-col"
            onMouseLeave={() => {
              //setBlogID("");
              setToggle(false);
              setEditing(false);
              setConfirming(false);
            }}
          >
            <div className="text-2xl font-semibold font-mono self-start flex w-[100%] justify-between">
              <h1>{blog.title}</h1>
              {blog.username === userName ? (
                <div className="flex flex-col">
                  <button
                    className="text-black dark:text-white font-bold opacity-70 text-xl self-end"
                    onClick={() => {
                      setBlogID(blog._id);
                      setToggle((prev) => !prev);
                    }}
                  >
                    &#8942;
                  </button>
                  {toggleButtons && blogID === blog._id ? (
                    <div className="flex flex-col">
                      <button
                        className="text-black dark:text-white font-bold opacity-70 text-xl self-start"
                        onClick={(e) => {
                          setConfirming(false);
                          setEditing((prev) => !prev);
                          setBlogID(blog._id);
                        }}
                      >
                        {editing && blogID === blog._id ? <>❌</> : <>Edit</>}
                      </button>
                      <button
                        className="text-black dark:text-white font-bold opacity-70 text-xl self-start"
                        onClick={(e) => {
                          setEditing(false);
                          console.log(blog._id);
                          setConfirming((prev) => !prev);
                          setBlogID(blog._id);
                          //else setBlogID("");
                        }}
                      >
                        {confirming && blogID === blog._id ? (
                          <>❌</>
                        ) : (
                          <>Delete</>
                        )}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            {confirming && blogID === blog._id ? (
              <div className="self-end flex flex-col font-mono bg-[#CCC8AA] bg-opacity-40 p-4 my-4 opacity-70">
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

            {editing && blog._id === blogID ? (
              <div className="flex flex-col">
                <textarea
                  className="bg-transparent text-xl font-light text-black dark:text-white text-[16px] md:text-xl p-4 border-white border-2 resize-none"
                  value={tempContent || blog.content}
                  onChange={(e) => {
                    setContent(e.currentTarget.value);
                  }}
                  onMouseEnter={(e) => {
                    // Auto-resize the textarea based on its content
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height =
                      e.currentTarget.scrollHeight + "px";
                  }}
                ></textarea>
                <button
                  className="self-end text-green-500 font-bold opacity-70 text-xl mt-2"
                  onClick={async (e) => {
                    await Axios.post(
                      "http://localhost:3001/editBlogContent",
                      {
                        _id: blog._id,
                        content: tempContent,
                      },
                      { withCredentials: true }
                    ).then((response) => {
                      //console.log(response.data);
                      setEditing(false);
                      setToggle(false);
                    });
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-xl font-light text-black dark:text-white text-[16px] md:text-xl whitespace-pre-line">
                {blog.content}
              </p>
            )}

            <br />
            <p className="self-end text-xs text-black dark:text-white font-mono text-opacity-80">
              {blog.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
