"use client";
import ParticlesBg from "@/app/components/ParticlesBg";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Blog from "@/app/components/Blog";

type Params = {
  params: {
    id: string;
  };
};

type blogType = {
  _id: string;
  title: string;
  content: string;
  username: string;
  date: string;
};

export default function BlogPage({ params: { id } }: Params) {
  const [blog, setBlog] = useState({} as blogType);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      Axios.get(`http://localhost:3001/getBlogs/${id}`)
        .then((response) => {
          setBlog(response.data);
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    };

    fetchData();
  }, [blog, id]);

  return (
    <main>
      <ParticlesBg />
      {blog ? (
        <Blog blog={blog} />
      ) : (
        <>
          Blog not found
          {router.push("/blogs")}
        </>
      )}
    </main>
  );
}
