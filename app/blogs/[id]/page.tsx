"use client";
import ParticlesBg from "@/app/components/ParticlesBg";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Blog from "@/app/components/Blog";
import blogType from "@/app/lib/blogType";

type Params = {
  params: {
    id: string;
  };
};

export default function BlogPage({ params: { id } }: Params) {
  const [blog, setBlog] = useState({} as blogType);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      Axios.get(`https://blogsserver.onrender.com/Blogs/${id}`)
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
