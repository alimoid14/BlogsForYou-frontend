import React, { useState, useEffect } from "react";
import Axios from "axios";
//import ParticlesBg from "../components/ParticlesBg";
import Link from "next/link";
import getUser from "../lib/getUser";
import blogType from "../lib/blogType";
import { usePathname } from "next/navigation";

type BlogProps = {
  blog: blogType;
};

const Blog: React.FC<BlogProps> = ({ blog }) => {
  const [userName, setUserName] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);
  const [blogID, setBlogID] = useState("");
  const [tempContent, setContent] = useState("");
  const [toggleButtons, setToggle] = useState(false);
  const location = usePathname();

  useEffect(() => {
    setContent("");
  }, [blogID]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();

      if (userData !== "") setUserName(userData.username);
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <div
      key={blog._id}
      className="mb-16 flex h-auto flex-col rounded-xl p-12"
      onMouseLeave={() => {
        //setBlogID("");
        setToggle(false);
        setEditing(false);
        setConfirming(false);
      }}
    >
      <div className="flex w-[100%] justify-between self-start font-mono text-2xl font-semibold">
        <h1>
          <Link href={`/blogs/${blog._id}`}>{blog.title}</Link>
        </h1>
        {blog.username === userName && location !== "/blogs" ? (
          <div className="flex flex-col">
            <button
              className="self-end text-xl font-bold text-black opacity-70 dark:text-white"
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
                  className="self-start text-xl font-bold text-black opacity-70 dark:text-white"
                  onClick={(e) => {
                    setConfirming(false);
                    setEditing((prev) => !prev);
                    setBlogID(blog._id);
                  }}
                >
                  {editing && blogID === blog._id ? <>❌</> : <>Edit</>}
                </button>
                <button
                  className="self-start text-xl font-bold text-black opacity-70 dark:text-white"
                  onClick={(e) => {
                    setEditing(false);
                    //console.log(blog._id);
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
        ) : (
          <></>
        )}
      </div>
      {confirming && blogID === blog._id ? (
        <div className="my-4 flex flex-col self-start bg-[#CCC8AA] bg-opacity-40 p-4 font-mono opacity-70">
          <p>
            Are you sure you want to delete this blog? You won&apos;t be able to
            retrieve it again.
          </p>
          <div className="mt-4 flex flex-row justify-evenly font-bold">
            <button
              className="text-red-500"
              onClick={async () => {
                //blogList.filter((blog) => blog._id !== blogID);
                await Axios.delete(
                  `https://blogsserver.onrender.com/Blogs/${blog._id}`,
                  {
                    withCredentials: true,
                  },
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
      <h1 className="self-end font-mono text-[16px] italic text-[#F4BF96] md:text-xl">
        ~by <Link href={`/users/${blog.username}`}>{blog.username}</Link>
      </h1>
      <br />

      {editing && blog._id === blogID ? (
        <div className="flex flex-col">
          <textarea
            className="resize-none border-2 border-white bg-transparent p-4 text-[16px] text-xl font-light text-black dark:text-white md:text-xl"
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
            className="mt-2 self-end text-xl font-bold text-green-500 opacity-70"
            onClick={async (e) => {
              await Axios.put(
                `https://blogsserver.onrender.com/Blogs/${blog._id}`,
                {
                  content: tempContent,
                },
                { withCredentials: true },
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
        <p
          className={`text-[16px] text-xl font-light text-black dark:text-white md:text-xl ${
            location === "/blogs" ? "" : "whitespace-pre-line"
          }`}
        >
          {blog.content?.length > 200 && location === "/blogs" ? (
            <>
              {blog.content.slice(0, 200)}
              <a href={`/blogs/${blog._id}`} className="text-blue-500">
                {" "}
                read more...
              </a>
            </>
          ) : (
            blog.content
          )}
        </p>
      )}

      <br />
      <p className="self-end font-mono text-xs text-black text-opacity-80 dark:text-white">
        {blog.date}
      </p>
    </div>
  );
};

export default Blog;
