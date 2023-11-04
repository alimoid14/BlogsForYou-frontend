import { format } from "path";
import React from "react";

export default function CreateBlog() {
  return (
    <main className="main-height flex flex-col items-center text-2xl">
      <form className="h-5/6 w-5/6 flex flex-col justify-center" action="">
        <textarea
          placeholder="Type your blog here..."
          className="bg-[#0C356A] mt-auto border-8  border-[#0C356A] w-full h-5/6 p-4 rounded-xl text-white text-opacity-50"
        ></textarea>
        <button className="mt-auto self-center bg-[#0C356A] rounded-xl px-2 text-white">
          Submit
        </button>
      </form>
    </main>
  );
}
